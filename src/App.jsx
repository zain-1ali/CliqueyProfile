import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'

function App() {


  return (
    <>
<div className='w-[100%] flex justify-center min-h-[100vh]'>
<BrowserRouter>
        <Routes>
          <Route path="/:userid" element={<Home />} />

        </Routes>
      </BrowserRouter>
</div>
    </>
  )
}

export default App
