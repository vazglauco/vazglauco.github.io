'use client'

import { FormEvent, useEffect, useState } from 'react'
import { LoaderCircle, MessageCircle, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react'

type Vote = 'like' | 'dislike' | null

interface Comment {
  id: string
  name: string
  message: string
  createdAt: string
  own: boolean
}

interface Interactions {
  vote: Vote
  likes: number
  dislikes: number
  comments: Comment[]
}

const emptyInteractions: Interactions = { vote: null, likes: 0, dislikes: 0, comments: [] }

function visitorId() {
  const key = 'blog-visitor-id'
  const saved = window.localStorage.getItem(key)
  if (saved) return saved
  const id = crypto.randomUUID()
  window.localStorage.setItem(key, id)
  return id
}

export function ArticleInteractions({ slug }: { slug: string }) {
  const [interactions, setInteractions] = useState<Interactions>(emptyInteractions)
  const [clientId, setClientId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')

  useEffect(() => {
    const id = visitorId()
    setClientId(id)
    fetch(`/api/blog/interactions?slug=${encodeURIComponent(slug)}`, {
      headers: { 'x-client-id': id },
      cache: 'no-store',
    })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        setInteractions(data as Interactions)
      })
      .catch(() => setError('As interações estão temporariamente indisponíveis.'))
      .finally(() => setLoading(false))
  }, [slug])

  async function update(payload: Record<string, unknown>) {
    if (!clientId || saving) return false
    setSaving(true)
    setError('')
    try {
      const response = await fetch('/api/blog/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, slug, clientId }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setInteractions(data as Interactions)
      return true
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível salvar.')
      return false
    } finally {
      setSaving(false)
    }
  }

  async function vote(value: Exclude<Vote, null>) {
    await update({ action: 'vote', vote: interactions.vote === value ? null : value })
  }

  async function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const saved = await update({ action: 'comment', name, message, website })
    if (saved) setMessage('')
  }

  async function removeComment(id: string) {
    await update({ action: 'deleteComment', commentId: id })
  }

  if (loading) {
    return (
      <div className="mt-16 flex min-h-32 items-center justify-center border-t border-neutral-200 text-neutral-300">
        <LoaderCircle className="h-5 w-5 animate-spin" aria-label="Carregando interações" />
      </div>
    )
  }

  return (
    <section className="mt-16 pt-10 border-t border-neutral-200" aria-labelledby="article-feedback-title">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-red-500 mb-2">
            // sua opinião
          </p>
          <h2 id="article-feedback-title" className="font-black text-2xl tracking-tight text-neutral-800">
            Este artigo foi útil?
          </h2>
        </div>

        <div className="flex gap-2" aria-label="Avaliar artigo">
          <button
            type="button"
            disabled={saving}
            aria-pressed={interactions.vote === 'like'}
            onClick={() => vote('like')}
            className={`inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs transition-colors disabled:opacity-50 ${
              interactions.vote === 'like'
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-300 text-neutral-500 hover:border-neutral-800 hover:text-neutral-900'
            }`}
          >
            <ThumbsUp className="w-4 h-4" /> gostei <span>({interactions.likes})</span>
          </button>
          <button
            type="button"
            disabled={saving}
            aria-pressed={interactions.vote === 'dislike'}
            onClick={() => vote('dislike')}
            className={`inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs transition-colors disabled:opacity-50 ${
              interactions.vote === 'dislike'
                ? 'border-red-600 bg-red-600 text-white'
                : 'border-neutral-300 text-neutral-500 hover:border-red-500 hover:text-red-600'
            }`}
          >
            <ThumbsDown className="w-4 h-4" /> não gostei <span>({interactions.dislikes})</span>
          </button>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center gap-2 mb-5">
          <MessageCircle className="w-5 h-5 text-red-500" />
          <h2 className="font-black text-xl tracking-tight text-neutral-800">Comentários</h2>
          <span className="font-mono text-xs text-neutral-400">({interactions.comments.length})</span>
        </div>

        <form onSubmit={addComment} className="grid gap-3" aria-label="Adicionar comentário">
          <label className="grid gap-1.5">
            <span className="font-mono text-[0.65rem] text-neutral-500">nome</span>
            <input
              value={name}
              onChange={event => setName(event.target.value)}
              maxLength={40}
              required
              className="w-full border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition-colors focus:border-red-500"
              placeholder="Como quer aparecer"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[0.65rem] text-neutral-500">comentário</span>
            <textarea
              value={message}
              onChange={event => setMessage(event.target.value)}
              maxLength={1000}
              minLength={3}
              required
              rows={4}
              className="w-full resize-y border border-neutral-300 bg-white px-3 py-2.5 text-sm leading-relaxed text-neutral-800 outline-none transition-colors focus:border-red-500"
              placeholder="Escreva sua opinião ou pergunta..."
            />
          </label>
          <label className="absolute -left-[9999px]" aria-hidden="true">
            Website
            <input value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className={`font-mono text-[0.62rem] leading-relaxed ${error ? 'text-red-600' : 'text-neutral-400'}`} role="status">
              {error || 'comentários públicos; você pode excluir os que publicar neste navegador.'}
            </p>
            <button
              type="submit"
              disabled={saving || Boolean(error && !clientId)}
              className="inline-flex items-center gap-2 bg-neutral-900 px-5 py-2.5 font-mono text-xs text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
              publicar comentário
            </button>
          </div>
        </form>

        {interactions.comments.length > 0 && (
          <ol className="mt-8 grid gap-4">
            {interactions.comments.map(comment => (
              <li key={comment.id} className="border-l-2 border-neutral-200 bg-white px-4 py-3">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-bold text-sm text-neutral-800">{comment.name}</p>
                    <time className="font-mono text-[0.58rem] text-neutral-400" dateTime={comment.createdAt}>
                      {new Date(comment.createdAt).toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </time>
                  </div>
                  {comment.own && (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => removeComment(comment.id)}
                      className="p-1 text-neutral-300 transition-colors hover:text-red-500 disabled:opacity-50"
                      aria-label={`Excluir comentário de ${comment.name}`}
                      title="Excluir comentário"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-600">{comment.message}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
