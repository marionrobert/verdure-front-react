import {useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBagShopping, faUser, faUserGear, faXmark} from "@fortawesome/free-solid-svg-icons"
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { config } from "../config"
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(selectUser)


  // const displayUserMenu = () => {
  //   let userMenu = document.querySelector("div.menu-user")
  //   userMenu.style.display="flex"
  // }

  const displayConnexionMenu = () => {
    const connexionMenu = document.querySelector("div.connexion-menu")
    connexionMenu.style.display = "flex"
  }

  const closeConnexionMenu = () => {
    const connexionMenu = document.querySelector("div.connexion-menu")
    connexionMenu.style.display = "none"
  }


  return (
    <header>
      <nav id="nav-menu">
        <div className="brand">
          <Link to="/"><img src={`${config.pict_url}/icons/plant_flowerpot.svg`} className="icon"/></Link>
          <Link to="/"><span>Verdure</span></Link>
        </div>

        { user.isLogged === false ?
          <div className="nav-links-mobile">
            <Link className="nav-link fa-user-regular" onClick={displayConnexionMenu}><FontAwesomeIcon icon={faUserRegular}/></Link>
            <Link to="/basket" className="nav-link"><FontAwesomeIcon icon={faBagShopping}/></Link>
          </div> :
          <div className="nav-links-mobile">
            {user.infos.role === "user" ?
              <Link className="nav-link" to="/myaccount"><FontAwesomeIcon icon={faUser}/></Link>
              :
              <Link className="nav-link" to="/admin"><FontAwesomeIcon icon={faUserGear}/></Link>
            }
            <Link to="/basket" className="nav-link"><FontAwesomeIcon icon={faBagShopping}/></Link>
          </div>
        }

        { user.isLogged === false ?

        <div className="nav-links-tablet">
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          <Link className="nav-link fa-user-regular" onClick={displayConnexionMenu}><FontAwesomeIcon icon={faUserRegular}/></Link>
          <Link to="/basket" className="nav-link"><FontAwesomeIcon icon={faBagShopping}/></Link>
        </div>
        :
        <div className="nav-links-tablet">
          <Link to="/plants" className="nav-link our-plants">Nos plantes</Link>
          {user.infos.role === "user" ?
            <Link to="/myaccount" className="nav-link"><FontAwesomeIcon icon={faUser}/></Link>
            :
            <Link to="/admin"  className="nav-link"><FontAwesomeIcon icon={faUserGear}/></Link>
          }
          <Link to="/basket"><FontAwesomeIcon icon={faBagShopping}/></Link>
        </div> }

      </nav>

      <div className='connexion-menu'>
        <FontAwesomeIcon icon={faXmark} onClick={closeConnexionMenu}/>
        <button><Link to='/login' onClick={closeConnexionMenu}  className="connexion-menu-link">Se connecter</Link></button>
        <button><Link to='/register' onClick={closeConnexionMenu} className="connexion-menu-link">Créer un compte</Link></button>
      </div>


      <div className='menu-user'>
        {user.isLogged && user.infos.role === "user" && <Link to='/myaccount'>Mon compte</Link>}
        {user.isLogged && user.infos.role === "admin" && <Link to='/admin'>Admin</Link>}
        <Link to='/logout'> Déconnexion</Link>
      </div>
    </header>
  )
}

export default Header;
