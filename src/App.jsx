import './App.css'

import Header from "./components/header"
import Footer from "./components/footer"
import Home from "./containers/home"
// import Add from "./containers/add"
// import Edit from "./containers/edit"
import Details from "./containers/details"
// import Admin from "./containers/admin"

import { Routes, Route, Navigate } from 'react-router-dom'
//composant supérieur va gérer le composant enfant
import RequireDataAuth from "./helpers/require-data-auth"

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
