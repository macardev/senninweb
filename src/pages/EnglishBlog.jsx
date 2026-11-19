import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useReleaseStaticBody from '../hooks/useReleaseStaticBody'
import { englishPosts } from '../data/englishPosts'
import { englishBlogPage } from '../content/englishBlog'

export default function EnglishBlog() {
  const { slug } = useParams()
  const post = englishPosts.find(item => item.slug === slug)
  const missing = Boolean(slug && !post)
  const page = englishBlogPage(post)
  useReleaseStaticBody()
  useEffect(() => {
    document.documentElement.lang = 'en-IE'
    document.title = missing ? 'Article not found | SenninWeb' : page.title
  }, [page.title, missing])
  if (missing) return <section className="clinic-blog"><h1>Article not found</h1><a href="/en/blog">Back to the blog</a></section>
  return <>
    <script type="application/ld+json">{JSON.stringify(page.jsonLd)}</script>
    <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
  </>
}
