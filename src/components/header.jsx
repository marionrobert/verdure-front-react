import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import { config } from "../config"
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(selectUser)



  return (
    <header>
      <nav id="nav-menu">
        <div className="brand">
          <Link to="/"><img src={`${config.pict_url}/icons/plant_flowerpot.svg`} className="icon"/></Link>
          <p>Verdure</p>
        </div>

        <div className="nav-links">
          { user.isLogged === false && <Link to='/login'  className="nav-link">Se connecter</Link>}
          { user.isLogged === false && <Link to='/register'  className="nav-link">Créer un compte</Link>}
          { user.isLogged === true && user.infos.role === "user" && <Link to='/myaccount'  className="nav-link"> Mon compte</Link>}
          { user.isLogged === true && user.infos.role === "admin" && <Link to='/admin'  className="nav-link">Admin</Link>}
          { user.isLogged === true && <Link to='/logout'  className="nav-link"> Se déconnecter</Link>}
          {/* <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome}/> Accueil</Link> */}
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          <Link to="#"><FontAwesomeIcon icon={faBasketShopping}/></Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;
