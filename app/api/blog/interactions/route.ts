import { createHash, randomUUID } from 'node:crypto'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

interface InteractionRequest {
  action?: 'vote' | 'comment' | 'deleteComment'
  slug?: string
  clientId?: string
  vote?: 'like' | 'dislike' | null
  name?: string
  message?: string
  commentId?: string
  website?: string
}

function database() {
  const url = process.env.SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY
  if (!url || !secretKey) throw new Error('Supabase não configurado')

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

function hash(value: string) {
  const salt = process.env.INTERACTIONS_HASH_SALT
  if (!salt) throw new Error('INTERACTIONS_HASH_SALT não configurada')
  return createHash('sha256').update(`${salt}:${value}`).digest('hex')
}

function validSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && slug.length <= 120 && slugPattern.test(slug)
}

function validClientId(clientId: unknown): clientId is string {
  return typeof clientId === 'string' && /^[a-f0-9-]{20,80}$/i.test(clientId)
}

function clientAddress(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

async function enforceRateLimit(
  supabase: SupabaseClient,
  identity: string,
  action: 'vote' | 'comment' | 'deleteComment',
) {
  const windowLength = action === 'comment' ? 10 * 60_000 : 60_000
  const limit = action === 'comment' ? 5 : 30
  const windowId = Math.floor(Date.now() / windowLength)
  const { data, error } = await supabase.rpc('consume_blog_rate_limit', {
    p_identity_hash: identity,
    p_action: action,
    p_window_id: windowId,
  })

  if (error) throw error
  if (Number(data) > limit) {
    throw new Response('Muitas tentativas. Aguarde alguns minutos.', { status: 429 })
  }
}

async function interactionSnapshot(supabase: SupabaseClient, slug: string, visitorHash: string) {
  const [likesResult, dislikesResult, commentsResult, visitorVoteResult] = await Promise.all([
    supabase.from('blog_votes').select('*', { count: 'exact', head: true }).eq('post_slug', slug).eq('value', 1),
    supabase.from('blog_votes').select('*', { count: 'exact', head: true }).eq('post_slug', slug).eq('value', -1),
    supabase
      .from('blog_comments')
      .select('id, author_hash, author_name, message, created_at')
      .eq('post_slug', slug)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(100),
    supabase
      .from('blog_votes')
      .select('value')
      .eq('post_slug', slug)
      .eq('voter_hash', visitorHash)
      .maybeSingle(),
  ])

  const queryError = likesResult.error || dislikesResult.error || commentsResult.error || visitorVoteResult.error
  if (queryError) throw queryError

  const visitorValue = Number(visitorVoteResult.data?.value || 0)
  return {
    vote: visitorValue === 1 ? 'like' : visitorValue === -1 ? 'dislike' : null,
    likes: likesResult.count || 0,
    dislikes: dislikesResult.count || 0,
    comments: (commentsResult.data || []).map(comment => ({
      id: comment.id,
      name: comment.author_name,
      message: comment.message,
      createdAt: comment.created_at,
      own: comment.author_hash === visitorHash,
    })),
  }
}

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug')
    const clientId = request.headers.get('x-client-id')
    if (!validSlug(slug) || !validClientId(clientId)) {
      return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
    }

    const snapshot = await interactionSnapshot(database(), slug, hash(clientId))
    return NextResponse.json(snapshot, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch (error) {
    console.error('Failed to load blog interactions', error)
    return NextResponse.json({ error: 'Interações temporariamente indisponíveis.' }, { status: 503 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as InteractionRequest
    if (!validSlug(body.slug) || !validClientId(body.clientId) || !body.action) {
      return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 })
    }

    const supabase = database()
    const visitorHash = hash(body.clientId)
    await enforceRateLimit(supabase, hash(clientAddress(request)), body.action)

    if (body.action === 'vote') {
      if (body.vote === null) {
        const { error } = await supabase
          .from('blog_votes')
          .delete()
          .eq('post_slug', body.slug)
          .eq('voter_hash', visitorHash)
        if (error) throw error
      } else if (body.vote === 'like' || body.vote === 'dislike') {
        const { error } = await supabase.from('blog_votes').upsert(
          {
            post_slug: body.slug,
            voter_hash: visitorHash,
            value: body.vote === 'like' ? 1 : -1,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'post_slug,voter_hash' },
        )
        if (error) throw error
      } else {
        return NextResponse.json({ error: 'Avaliação inválida.' }, { status: 400 })
      }
    }

    if (body.action === 'comment') {
      if (body.website) return NextResponse.json(await interactionSnapshot(supabase, body.slug, visitorHash))

      const name = body.name?.trim()
      const message = body.message?.trim()
      if (!name || name.length > 40 || !message || message.length < 3 || message.length > 1000) {
        return NextResponse.json({ error: 'Revise o nome e o comentário.' }, { status: 400 })
      }

      const { error } = await supabase.from('blog_comments').insert({
        id: randomUUID(),
        post_slug: body.slug,
        author_hash: visitorHash,
        author_name: name,
        message,
      })
      if (error) throw error
    }

    if (body.action === 'deleteComment') {
      if (!body.commentId || !/^[a-f0-9-]{36}$/i.test(body.commentId)) {
        return NextResponse.json({ error: 'Comentário inválido.' }, { status: 400 })
      }

      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', body.commentId)
        .eq('post_slug', body.slug)
        .eq('author_hash', visitorHash)
      if (error) throw error
    }

    return NextResponse.json(await interactionSnapshot(supabase, body.slug, visitorHash))
  } catch (error) {
    if (error instanceof Response) {
      return NextResponse.json({ error: await error.text() }, { status: error.status })
    }
    console.error('Failed to update blog interactions', error)
    return NextResponse.json({ error: 'Não foi possível salvar. Tente novamente.' }, { status: 503 })
  }
}
