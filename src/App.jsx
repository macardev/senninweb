import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "@/components/layout/Layout"
import Home from "@/pages/Home"
import Blog from "@/pages/Blog"
import BlogPost from "@/pages/BlogPost"


export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* 🏠 ANA SAYFA */}
          <Route path="/" element={<Home />} />

          {/* 📝 BLOG LİSTE (keep existing + add lowercase alias) */}
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog" element={<Blog />} />

          {/* 📝 BLOG DETAY */}
          <Route path="/blog/kucuk-isletme-web-sitesi" element={<BlogPost />} />
        </Route>
      </Routes>
    </Router>
  )
}