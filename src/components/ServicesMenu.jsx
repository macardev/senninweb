import { useEffect, useRef } from 'react'
import { services, servicePath } from '../data/englishServices'
export default function ServicesMenu() {
  const menu = useRef(null)
  useEffect(() => {
    const close = event => { if (!menu.current.contains(event.target)) menu.current.open = false }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])
  return <details ref={menu} className="services-menu" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) e.currentTarget.open = false }} onKeyDown={e => {
    if (e.key === 'Escape') { menu.current.open = false; menu.current.querySelector('summary').focus() }
  }}>
    <summary>Services <span aria-hidden="true">⌄</span></summary>
    <div>{services.map(item => <a key={item.slug} href={servicePath(item)}>{item.name}</a>)}</div>
  </details>
}
