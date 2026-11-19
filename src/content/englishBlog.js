import { englishPosts } from '../data/englishPosts.js'

export const blogPath = '/en/blog'
export const articlePath = post => blogPath + '/' + post.slug
const site = 'https://www.senninweb.com'
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const dateLabel = iso => new Intl.DateTimeFormat('en-IE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso))

export function englishBlogPage(post) {
  const title = post?.title || 'Clinic website blog'
  const description = post?.description || 'Practical guides for Irish clinics on website design, patient enquiries and online booking.'
  const url = site + (post ? articlePath(post) : blogPath)
  const header = '<header><a href="/en">SenninWeb</a><a href="/en/blog">Clinic blog</a></header>'
  const article = post && '<article><p class="byline">' + escape(post.author) + ' · <time datetime="' + post.date + '">' + dateLabel(post.date) + '</time></p><h1>' + escape(title) + '</h1>' +
    post.sections.map(section => '<section><h2>' + escape(section.heading) + '</h2>' + section.paragraphs.map(p => '<p>' + escape(p).replaceAll('\n', '<br>') + '</p>').join('') +
      (section.source ? '<p><a href="' + escape(section.source.url) + '">' + escape(section.source.label) + '</a></p>' : '') + '</section>').join('') +
    '<footer><p>Already have a website and wondering, ‘Where am I losing visitors?’ <a href="/en#contact">Get in touch with me</a>, and let’s find out together.</p><a href="/en/blog">Back to the blog</a></footer></article>'
  const listing = () => '<h1>' + title + '</h1><p>' + description + '</p>' + englishPosts.map(item => '<article><time datetime="' + item.date + '">' + dateLabel(item.date) + '</time><h2><a href="' + articlePath(item) + '">' + escape(item.title) + '</a></h2><p>' + escape(item.description) + '</p></article>').join('')
  return {
    title: title + ' | SenninWeb', description, url,
    bodyHtml: '<div class="clinic-blog" lang="en-IE">' + header + '<div class="clinic-blog-copy">' + (article || listing()) + '</div></div>',
    jsonLd: {
      '@context': 'https://schema.org', '@type': post ? 'BlogPosting' : 'CollectionPage', url, name: title, description, inLanguage: 'en-IE',
      ...(post ? { headline: title, datePublished: post.date, author: { '@type': 'Person', name: post.author }, mainEntityOfPage: url, image: site + '/og-image.jpg' } : { hasPart: englishPosts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: site + articlePath(p) })) })
    }
  }
}
