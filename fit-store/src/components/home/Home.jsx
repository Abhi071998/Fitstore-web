import React from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from '../common/components/Navbar'
function Home() {
  return (
  <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800">Welcome to FIT STORE</h1>
      <p className="mt-2 text-slate-600">Explore our latest collection of gym tees and activewear.</p>
    </div>
  )
}

export default Home