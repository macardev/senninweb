const CACHE_KEY = 'senninweb-blog-posts'

export async function getAllBlogPosts() {
  const cached = sessionStorage.getItem(CACHE_KEY)
  if (cached) {
    try { return JSON.parse(cached) } catch {}
  }
  const res = await fetch('/data/blog-posts.json')
  const data = await res.json()
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(data)) } catch {}
  return data
}

export async function getBlogPost(slug) {
  const posts = await getAllBlogPosts()
  return posts.find(p => p.slug === slug) || null
}
