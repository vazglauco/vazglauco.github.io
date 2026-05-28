import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const post = getPostBySlug(slug)
    return { title: `${post.title} — glauco.vaz()` }
  } catch {
    return { title: 'blog — glauco.vaz()' }
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <main className="bg-[#faf9f7] min-h-screen pt-28 pb-24">
      <div className="max-w-[72ch] mx-auto px-8">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 hover:text-black transition-colors mb-10"
        >
          ← blog<span className="text-red-500">.</span>posts<span className="text-red-500">()</span>
        </Link>

        {/* Meta */}
        <h1 className="font-black text-3xl md:text-4xl tracking-tight leading-tight text-neutral-800 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 flex-wrap mb-8">
          <span className="font-mono text-xs text-neutral-400">
            {new Date(post.date + 'T12:00:00').toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <div className="flex gap-1.5">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[0.58rem] text-neutral-400 border border-neutral-200 px-2 py-1 leading-none"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <hr className="border-neutral-200 mb-10" />

        {/* Body */}
        <article className="
          font-light text-base leading-[1.85] text-neutral-700
          [&_h2]:font-black [&_h2]:text-2xl [&_h2]:text-neutral-800 [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-tight
          [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-neutral-800 [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:mb-5
          [&_strong]:font-bold [&_strong]:text-neutral-800
          [&_em]:italic
          [&_code]:font-mono [&_code]:text-[0.82em] [&_code]:bg-neutral-100 [&_code]:text-neutral-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm
          [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:p-5 [&_pre]:rounded-sm [&_pre]:overflow-x-auto [&_pre]:mb-6
          [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:text-neutral-100
          [&_a]:text-black [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-neutral-300 hover:[&_a]:decoration-red-400
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ul]:space-y-1
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5 [&_ol]:space-y-1
          [&_blockquote]:border-l-[3px] [&_blockquote]:border-red-500 [&_blockquote]:pl-5 [&_blockquote]:text-neutral-500 [&_blockquote]:italic [&_blockquote]:mb-5
          [&_hr]:border-neutral-200 [&_hr]:my-10
        ">
          <MDXRemote source={post.content} />
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 hover:text-black transition-colors"
          >
            ← voltar para blog<span className="text-red-500">.</span>posts<span className="text-red-500">()</span>
          </Link>
        </div>

      </div>
    </main>
  )
}
