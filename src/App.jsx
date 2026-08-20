import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "@/components/layout/Layout"
import ScrollToTop from "@/components/ui/ScrollToTop"
import Home from "@/pages/Home"

const Hakkimizda = lazy(() => import("@/pages/Hakkimizda"))
const Blog = lazy(() => import("@/pages/Blog"))
const BlogPost = lazy(() => import("@/pages/BlogPost"))
const Bilecik = lazy(() => import("@/pages/Bilecik"))
const Kocaeli = lazy(() => import("@/pages/Kocaeli"))
const SSS = lazy(() => import("@/pages/SSS"))
const HizmetWebTasarim = lazy(() => import("@/pages/HizmetWebTasarim"))
const HizmetSeoVeBuyume = lazy(() => import("@/pages/HizmetSeoVeBuyume"))
const HizmetETicaret = lazy(() => import("@/pages/HizmetETicaret"))
const HizmetDijitalPazarlama = lazy(() => import("@/pages/HizmetDijitalPazarlama"))
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
          <Route path="/hizmet/web-tasarim" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <HizmetWebTasarim />
            </Suspense>
          } />
          <Route path="/hizmet/seo-ve-buyume" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <HizmetSeoVeBuyume />
            </Suspense>
          } />
          <Route path="/hizmet/eticaret-cozumleri" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <HizmetETicaret />
            </Suspense>
          } />
          <Route path="/hizmet/dijital-pazarlama" element={
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <HizmetDijitalPazarlama />
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
