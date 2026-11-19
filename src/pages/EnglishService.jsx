import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { services, servicePath } from '../data/englishServices'
import ServicesMenu from '../components/ServicesMenu'
import useReleaseStaticBody from '../hooks/useReleaseStaticBody'

export default function EnglishService() {
  const { slug } = useParams()
  const item = services.find(service => service.slug === slug)
  useReleaseStaticBody()
  useEffect(() => {
    document.documentElement.lang = 'en-IE'
    document.title = (item?.name || 'Service not found') + ' | SenninWeb'
  }, [item])
  if (!item) return <section className="clinic-blog"><h1>Service not found</h1><a href="/en">English home</a></section>
  const url = 'https://www.senninweb.com' + servicePath(item)
  return <div className="clinic-blog en-service">
    <header><a href="/en">SenninWeb</a><ServicesMenu /><a href="/en/blog">Blog</a></header>
    <article className="clinic-blog-copy"><h1>{item.name}</h1><p className="service-lead">{item.lead}</p>
      {item.paragraphs.map(p => <p key={p}>{p}</p>)}
      {item.source && <p><a href={item.source[1]}>{item.source[0]}</a></p>}
      <a href="/en#contact" className="en-cta">{item.cta} ↗</a>
      <footer><nav aria-label="Other services">{services.filter(s => s !== item).map(s => <a href={servicePath(s)} key={s.slug}>{s.name}</a>)}</nav></footer>
    </article>
    <script type="application/ld+json">{JSON.stringify({'@context':'https://schema.org','@type':'Service',name:item.name,description:item.description,url})}</script>
  </div>
}
