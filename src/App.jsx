import './App.css'

import Header from "./components/header"
import Footer from "./components/footer"

import Home from "./containers/home"
import Products from "./containers/products"
import Details from "./containers/details"
import Basket from './containers/basket'
import Payment from './containers/payment'
import Success from "./containers/success"
import OrderDetails from './containers/orderDetails'

import Login from "./containers/user/login"
import Register from './containers/user/register'
import Profile from "./containers/user/profile"
import Logout from './containers/user/logout'

import Admin from './containers/admin/admin'
import AddPlant from './containers/admin/plant/addPlant'
import EditPlant from './containers/admin/plant/editPlant'



import { Routes, Route, Navigate } from 'react-router-dom'
//composant supérieur va gérer le composant enfant
import RequireDataAuth from "./helpers/require-data-auth"


function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>

        {/* HOME, ALL PLANTS, DETAILS PLANT */}
          <Route exact path="/" element={<RequireDataAuth child={Home} auth={false} admin={false} />} />
          <Route exact path="/plants" element={<RequireDataAuth child={Products} auth={false} admin={false}/>}/>
          <Route exact path="/plant/details/:id" element={<RequireDataAuth child={Details} auth={true} admin={false} />} />

        {/* DETAILS BASKET, PAYEMENT , ORDER*/}
          <Route path="/basket" element={<RequireDataAuth child={Basket} auth={true} admin={false}/>}/>
          <Route exact path="/payement/:id" element={<RequireDataAuth child={Payment} auth={true} admin={false} />}/>
          <Route exact path="/success/:id" element={<RequireDataAuth child={Success} auth={true} admin={false} />}/>
          <Route exact path="/order/details/:id" element={<RequireDataAuth child={OrderDetails} auth={true} admin={false} />} />

        {/* LOGIN, LOGOUT, REGISTER, PROFILE */}
          <Route exact path="/login" element={<RequireDataAuth child={Login} auth={false} admin={false} />} />
          <Route exact path="/register" element={<RequireDataAuth child={Register} auth={false} admin={false} />} />
          <Route exact path="/logout" element={<RequireDataAuth child={Logout} auth={true} admin={false} />} />
          <Route exact path='/myaccount' element={<RequireDataAuth child={Profile} auth={true} admin={false} />} />

        {/* ADMIN */}
          <Route exact path="/admin" element={<RequireDataAuth child={Admin} auth={true} admin={true} />} />
          <Route exact path="/plant/add" element={<RequireDataAuth child={AddPlant} auth={true} admin={true} />}/>
          <Route exact path="/plant/update/:id" element={<RequireDataAuth child={EditPlant} auth={true} admin={true} />}/>

          <Route exact path="/home" element={<Navigate to="/"/>} />
          <Route exact path="*" element={<Navigate to="/home"/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
