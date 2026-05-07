import React, { lazy, Suspense } from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "@/components/layout/Layout"

const Home = lazy(() => import("@/pages/Home"))
const Blog = lazy(() => import("@/pages/Blog"))
const BlogPost = lazy(() => import("@/pages/BlogPost"))
const Gebze = lazy(() => import("@/pages/Gebze"))

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Home />
            </Suspense>
          } />
          <Route path="/Blog" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Blog />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Blog />
            </Suspense>
          } />
          <Route path="/blog/:slug" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <BlogPost />
            </Suspense>
          } />
          <Route path="/gebze" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Gebze />
            </Suspense>
          } />
        </Route>
      </Routes>
    </Router>
  )
}
