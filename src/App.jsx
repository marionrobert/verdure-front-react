// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Header from "./components/header"
import Footer from "./components/footer"
import Home from "./containers/home"
// import Add from "./containers/add"
// import Edit from "./containers/edit"
import Details from "./containers/details"
// import Admin from "./containers/admin"

import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/plants/details/:id" element={<Details/>}/>
          <Route exact path="*" element={<Navigate to="/"/>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
