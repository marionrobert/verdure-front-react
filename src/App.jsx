import './App.css'

import Header from "./components/header"
import Footer from "./components/footer"
import Home from "./containers/home"
import Login from "./containers/user/login"
import Register from './containers/user/register'
import Products from "./containers/products"
import Profil from "./containers/user/profil"

// import Add from "./containers/add"
// import Edit from "./containers/edit"
import Details from "./containers/details"
// import Admin from "./containers/admin"

import { Routes, Route, Navigate } from 'react-router-dom'
//composant supérieur va gérer le composant enfant
import RequireDataAuth from "./helpers/require-data-auth"

function App() {

  return (
    <div>
      <Header />
        <Routes>
          <Route exact path="/" element={<RequireDataAuth child={Home} auth={false} admin={false} />} />
          <Route exact path="/plants" element={<RequireDataAuth child={Products} auth={true} admin={true}/>}/>
          <Route exact path="/login" element={<RequireDataAuth child={Login} auth={false} admin={false} />} />
          <Route exact path="/register" element={<RequireDataAuth child={Register} auth={false} admin={false} />} />
          <Route exact path='/profil' element={<RequireDataAuth child={Profil} auth={true} admin={false} />} />
          <Route exact path="/plant/details/:id" element={<Details/>}/>
          <Route exact path="*" element={<Navigate to="/"/>} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
