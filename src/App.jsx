import './App.css'

import Header from "./components/header"
import Footer from "./components/footer"

import Home from "./containers/home"
import Products from "./containers/products"
import Details from "./containers/details"

import Login from "./containers/user/login"
import Register from './containers/user/register'
import Profil from "./containers/user/profil"
import Logout from './containers/user/logout'

import Admin from './containers/admin/admin'
import AddPlant from './containers/admin/plant/addPlant'
import EditPlant from './containers/admin/plant/editPlant'
import OrderDetails from './containers/admin/order/orderDetail'



import { Routes, Route, Navigate } from 'react-router-dom'
//composant supérieur va gérer le composant enfant
import RequireDataAuth from "./helpers/require-data-auth"


function App() {

  return (
    <div>
      <Header />
        <Routes>

        {/* HOME, ALL PLANTS, DETAILS PLANT */}
          <Route exact path="/" element={<RequireDataAuth child={Home} auth={false} admin={false} />} />
          <Route exact path="/plants" element={<RequireDataAuth child={Products} auth={false} admin={false}/>}/>
          <Route exact path="/plant/details/:id" element={<RequireDataAuth child={Details} auth={false} admin={false} />} />

        {/* LOGIN, LOGOUT, REGISTER, PROFILE */}
          <Route exact path="/login" element={<RequireDataAuth child={Login} auth={false} admin={false} />} />
          <Route exact path="/register" element={<RequireDataAuth child={Register} auth={false} admin={false} />} />
          <Route exact path="/logout" element={<RequireDataAuth child={Logout} auth={true} admin={false} />} />
          <Route exact path='/myaccount' element={<RequireDataAuth child={Profil} auth={true} admin={false} />} />

        {/* ADMIN */}
          <Route exact path="/admin" element={<RequireDataAuth child={Admin} auth={true} admin={true} />} />
          <Route exact path="/plant/add" element={<RequireDataAuth child={AddPlant} auth={true} admin={true} />}/>
          <Route exact path="/plant/update/:id" element={<RequireDataAuth child={EditPlant} auth={true} admin={true} />}/>
          <Route exact path="/order/details/:id" element={<RequireDataAuth child={OrderDetails} auth={true} admin={true}/>}/>

          <Route exact path="*" element={<Navigate to="/"/>} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
