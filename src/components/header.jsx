import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBasketShopping, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons"
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
          <span>Verdure</span>
        </div>

        { user.isLogged === false ? <div className="nav-links">
          <Link to='/login'  className="nav-link">Se connecter</Link>
          <Link to='/register'  className="nav-link">Créer un compte</Link>
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          <Link to="#"><FontAwesomeIcon icon={faBasketShopping}/></Link>
        </div> : <div className="nav-links">
          {user.infos.role === "user" ? <Link to='/myaccount'  className="nav-link"><FontAwesomeIcon icon={faUser}/></Link> : <Link to='/admin'  className="nav-link"><FontAwesomeIcon icon={faUserGear}/></Link> }
          <Link to='/logout'  className="nav-link"> Se déconnecter</Link>
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          <Link to="#"><FontAwesomeIcon icon={faBasketShopping}/></Link>
        </div> }
      </nav>
    </header>
  )
}

export default Header;
