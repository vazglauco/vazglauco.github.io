import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { PostMeta } from '@/lib/blog'

interface Props {
  posts: PostMeta[]
}

export function LatestPostsSection({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section id="blog" className="bg-[#faf9f7] py-40 md:py-52">
      <div className="max-w-5xl mx-auto px-8 md:px-12 lg:px-14">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="block w-[3px] h-10 bg-red-500 shrink-0" />
          <h2 className="font-black tracking-tight leading-none text-black text-[2rem] md:text-[2.8rem]">
            blog<span className="text-red-500">.</span>posts<span className="text-red-500">()</span>
          </h2>
        </div>

        {/* Rows */}
        <div className="border-t border-neutral-200">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-b border-neutral-200 py-5 hover:bg-[#f0ede8] transition-colors duration-150 -mx-2 px-2"
            >
              <div className="flex items-baseline gap-4 flex-wrap mb-2">
                <span className="font-mono text-[0.6rem] text-red-500 leading-none shrink-0">
                  ({String(i + 1).padStart(2, '0')})
                </span>
                <h3 className="font-black tracking-tight leading-none text-neutral-800 text-[1.1rem] md:text-[1.4rem] group-hover:underline underline-offset-4 decoration-neutral-300">
                  {post.title}
                </h3>
                <span className="font-mono text-xs text-neutral-400 ml-auto shrink-0">
                  {new Date(post.date + 'T12:00:00').toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 ml-9">
                <div className="flex flex-wrap gap-1.5">
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
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="group flex items-center gap-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 font-mono text-xs uppercase tracking-widest px-8 py-4 font-bold"
          >
            ver todos os posts
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  )
}
