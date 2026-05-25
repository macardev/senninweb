import { blogPosts } from '../src/data/blogPosts.js'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputPath = resolve(__dirname, '..', 'public', 'data', 'blog-posts.json')

writeFileSync(outputPath, JSON.stringify(blogPosts, null, 2), 'utf-8')
console.log('✓ blog-posts.json created at', outputPath)
