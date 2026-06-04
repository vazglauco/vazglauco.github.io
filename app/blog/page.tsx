import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'blog — glauco.vaz()',
  description: 'Artigos sobre desenvolvimento, design e arquitetura de software.',
}

export default function BlogPage({ searchParams }: { searchParams: { tag?: string; order?: string } }) {
  const allPosts = getAllPosts()
  const activeTag = searchParams.tag ?? null
  const order = searchParams.order === 'asc' ? 'asc' : 'desc'

  const allTags = Array.from(new Set(allPosts.flatMap(p => p.tags))).sort()
  const filtered = activeTag ? allPosts.filter(p => p.tags.includes(activeTag)) : allPosts
  const posts = order === 'asc' ? [...filtered].reverse() : filtered

  return (
    <main className="bg-[#faf9f7] min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-8 md:px-12 lg:px-14">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="block w-[3px] h-10 bg-red-500 shrink-0" />
          <h1 className="font-black tracking-tight leading-none text-black text-[2.5rem] md:text-[3.5rem]">
            blog<span className="text-red-500">.</span>posts<span className="text-red-500">()</span>
          </h1>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/blog${order === 'asc' ? '?order=asc' : ''}`}
              className={`font-mono text-[0.65rem] px-3 py-1.5 border transition-colors duration-150 leading-none ${
                !activeTag
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-neutral-700'
              }`}
            >
              todos
            </Link>
            {allTags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}${order === 'asc' ? '&order=asc' : ''}`}
                className={`font-mono text-[0.65rem] px-3 py-1.5 border transition-colors duration-150 leading-none ${
                  activeTag === tag
                    ? 'bg-red-600 text-white border-red-600'
                    : 'text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-neutral-700'
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Sort order */}
          <div className="flex gap-1.5">
            <Link
              href={`/blog${activeTag ? `?tag=${encodeURIComponent(activeTag)}` : ''}`}
              className={`font-mono text-[0.65rem] px-3 py-1.5 border transition-colors duration-150 leading-none ${
                order === 'desc'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-neutral-700'
              }`}
            >
              mais novos
            </Link>
            <Link
              href={`/blog?${activeTag ? `tag=${encodeURIComponent(activeTag)}&` : ''}order=asc`}
              className={`font-mono text-[0.65rem] px-3 py-1.5 border transition-colors duration-150 leading-none ${
                order === 'asc'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-neutral-700'
              }`}
            >
              mais antigos
            </Link>
          </div>
        </div>

        {/* List */}
        <div className="border-t border-neutral-200">
          {posts.length === 0 && (
            <div className="flex items-center justify-center h-40 text-neutral-300 text-sm font-mono">
              // nenhum artigo nessa categoria
            </div>
          )}

          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-b border-neutral-200 py-6 hover:bg-[#f0ede8] transition-colors duration-150 -mx-2 px-2"
            >
              <div className="flex items-baseline gap-4 flex-wrap mb-2">
                <span className="font-mono text-[0.6rem] text-red-500 leading-none shrink-0">
                  ({String(i + 1).padStart(2, '0')})
                </span>
                <h2 className="font-black tracking-tight leading-none text-neutral-800 text-[1.2rem] md:text-[1.6rem] group-hover:underline underline-offset-4 decoration-neutral-300">
                  {post.title}
                </h2>
                <span className="font-mono text-xs text-neutral-400 ml-auto shrink-0">
                  {new Date(post.date + 'T12:00:00').toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed max-w-[60ch] ml-9 mb-3">
                <span className="text-red-500 font-mono text-xs">// </span>
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-2 ml-9">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className={`font-mono text-[0.58rem] border px-2 py-1 leading-none ${
                        activeTag === tag
                          ? 'text-red-500 border-red-200'
                          : 'text-neutral-400 border-neutral-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[0.65rem] text-neutral-300 group-hover:text-neutral-600 transition-colors flex items-center gap-1">
                  ler artigo <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
