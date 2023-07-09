import {useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBagShopping, faUser, faUserGear, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { config } from "../config"
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(selectUser)


  // const displayUserMenu = () => {
  //   console.log("j'ai été survolée")
  //   let userMenu = document.querySelector("div.menu-user")
  //   console.log(userMenu)
  //   userMenu.classList.toggle("display-none")

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
          <span>Verdure</span>
        </div>

        { user.isLogged === false ?
          <div className="nav-links-mobile">
            <p className="nav-link" onClick={displayConnexionMenu}><FontAwesomeIcon icon={faUserRegular}/></p>
            <Link to="/basket" className="nav-link"><FontAwesomeIcon icon={faBagShopping}/></Link>
          </div> :
          <div className="nav-links-mobile">
            {user.infos.role === "user" ?
              <div  className="nav-link"><FontAwesomeIcon icon={faUser}/></div>
              :
              <div   className="nav-link"><FontAwesomeIcon icon={faUserGear}/></div>
            }
            <Link to="/basket" className="nav-link"><FontAwesomeIcon icon={faBagShopping}/></Link>
          </div>
        }

        {/* { user.isLogged === false ? <div className="nav-links-tablet">
          <Link to='/login'  className="nav-link">Se connecter</Link>
          <Link to='/register'  className="nav-link">Créer un compte</Link>
          <Link to="/plants" className="nav-link our-plants">Nos plantes</Link>
          <Link to="/basket"><FontAwesomeIcon icon={faBasketShopping}/></Link>
        </div>
        :
        <div className="nav-links-tablet">
          <Link to="/plants" className="nav-link our-plants">Nos plantes</Link>
          {user.infos.role === "user" ?
            <div  className="nav-link"><FontAwesomeIcon icon={faUser}/></div>
            :
            <div   className="nav-link"><FontAwesomeIcon icon={faUserGear}/></div>
          }
          <Link to="/basket"><FontAwesomeIcon icon={faBasketShopping}/></Link>
        </div> } */}

      </nav>

      <div className='connexion-menu'>
        <FontAwesomeIcon icon={faXmark} onClick={closeConnexionMenu}/>
        <button><Link to='/login' onClick={closeConnexionMenu}  className="connexion-menu-link">Se connecter</Link></button>
        <button><Link to='/register' onClick={closeConnexionMenu} className="connexion-menu-link">Créer un compte</Link></button>
      </div>


      <div className='menu-user display-none'>
        {user.isLogged && user.infos.role === "user" && <Link to='/myaccount'>Mon compte</Link>}
        {user.isLogged && user.infos.role === "admin" && <Link to='/admin'>Admin</Link>}
        <Link to='/logout'> Déconnexion</Link>
      </div>
    </header>
  )
}

export default Header;
