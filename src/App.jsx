import './App.css'

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./containers/Home"
import Products from "./containers/Plants/AllPlants"
import Details from "./containers/Plants/PlantDetails"
import Basket from './containers/Basket'
import Payment from './containers/Payment'
import Success from "./containers/Success"
import OrderDetails from './containers/OrderDetails'

import Login from "./containers/User/login"
import Register from './containers/User/register'
import Profile from "./containers/User/profile"
import Logout from './containers/User/logout'

import Admin from './containers/Admin/admin'
import AddPlant from './containers/Admin/Plant/addPlant'
import EditPlant from './containers/Admin/Plant/editPlant'



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
