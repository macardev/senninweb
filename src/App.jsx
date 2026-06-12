import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "@/components/layout/Layout"
import ScrollToTop from "@/components/ui/ScrollToTop"
import Home from "@/pages/Home"

const Hakkimizda = lazy(() => import("@/pages/Hakkimizda"))
const Blog = lazy(() => import("@/pages/Blog"))
const BlogPost = lazy(() => import("@/pages/BlogPost"))
const Gebze = lazy(() => import("@/pages/Gebze"))
const Bilecik = lazy(() => import("@/pages/Bilecik"))
const Kocaeli = lazy(() => import("@/pages/Kocaeli"))
const SSS = lazy(() => import("@/pages/SSS"))
const NotFound = lazy(() => import("@/pages/NotFound"))

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hakkimizda" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Hakkimizda />
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
          <Route path="/bilecik" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Bilecik />
            </Suspense>
          } />
          <Route path="/kocaeli" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Kocaeli />
            </Suspense>
          } />
          <Route path="/sss" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <SSS />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <NotFound />
            </Suspense>
          } />
        </Route>
      </Routes>
    </Router>
  )
}
