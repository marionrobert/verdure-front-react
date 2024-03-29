import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBagShopping, faUser, faUserGear, faXmark, faUserCheck} from "@fortawesome/free-solid-svg-icons"
import { config } from "../config"
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import { selectBasket } from '../slices/basketSlice';

const Header = () => {
  const user = useSelector(selectUser)
  const currentBasket = useSelector(selectBasket)
  const [nbItems, setNbItems] = useState(0)

  useEffect(()=>{
    let number = 0
    currentBasket.basket.forEach(item => {
      number += item.quantityInCart
    });
    setNbItems(number)
  }, [currentBasket.basket])


  const displayUserMenu = () => {
    let userMenu = document.querySelector("div.menu-user")
    userMenu.style.display="flex"
  }

  const closeUserMenu = () => {
    let userMenu = document.querySelector("div.menu-user")
    userMenu.style.display="none"
  }

  const displayConnexionMenu = () => {
    const connexionMenu = document.querySelector("div.connexion-menu")
    connexionMenu.style.display = "flex"
  }

  const closeConnexionMenu = () => {
    const connexionMenu = document.querySelector("div.connexion-menu")
    connexionMenu.style.display = "none"
  }

  // {console.log(nbItems)}



  return (
    <header>
      <nav id="nav-menu">
        <div className="brand">
          <Link to="/"><img src={`${config.pict_url}/icons/plant_flowerpot.svg`} className="icon"/></Link>
          <Link to="/"><span>Verdure</span></Link>
        </div>

        { user.isLogged === false ?
          <div className="nav-links-mobile">
            <Link className="nav-link" onClick={displayConnexionMenu}><FontAwesomeIcon icon={faUser}/></Link>
            <Link to="/basket" className="nav-link" className="link-to-basket">
              <FontAwesomeIcon icon={faBagShopping}/>
              { nbItems > 0 && <span className='nbItems'>{nbItems}</span> }
            </Link>
          </div> :
          <div className="nav-links-mobile">
            {user.infos.role === "user" ?
              <Link className="nav-link" to="/myaccount"><FontAwesomeIcon icon={faUserCheck}/></Link>
              :
              <Link className="nav-link" to="/admin"><FontAwesomeIcon icon={faUserGear}/></Link>
            }
            <Link to="/basket" className="nav-link" className="link-to-basket"><FontAwesomeIcon icon={faBagShopping}/>{ nbItems > 0 && <span className='nbItems'>{nbItems}</span>}</Link>
          </div>
        }

        { user.isLogged === false ?

        <div className="nav-links-tablet">
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          <Link className="nav-link" onClick={displayConnexionMenu}><FontAwesomeIcon icon={faUser}/></Link>
          <Link to="/basket" className="nav-link" className="link-to-basket"><FontAwesomeIcon icon={faBagShopping}/>{ nbItems > 0 && <span className='nbItems'>{nbItems}</span>}</Link>
        </div>
        :
        <div className="nav-links-tablet">
          <Link to="/plants" className="nav-link our-plants">Nos plantes</Link>
          {user.infos.role === "user" ?
            <Link to="/myaccount" className="nav-link"><FontAwesomeIcon icon={faUserCheck}/></Link>
            :
            <Link to="/admin"  className="nav-link"><FontAwesomeIcon icon={faUserGear}/></Link>
          }
          <Link to="/basket" className="nav-link" className="link-to-basket"><FontAwesomeIcon icon={faBagShopping}/>{ nbItems > 0 && <span className='nbItems'>{nbItems}</span>}</Link>
        </div> }

        { user.isLogged === false ?

        <div className="nav-links-desktop">
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          <Link className="nav-link" onMouseEnter={displayConnexionMenu}><FontAwesomeIcon icon={faUser}/></Link>
          <Link to="/basket" className="nav-link" className="link-to-basket"><FontAwesomeIcon icon={faBagShopping}/>{ nbItems > 0 && <span className='nbItems'>{nbItems}</span>}</Link>
        </div>
        :
        <div className="nav-links-desktop">
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          {user.infos.role === "user" ?
            <Link to="/myaccount" className="nav-link" onMouseEnter={displayUserMenu}><FontAwesomeIcon icon={faUserCheck}/></Link>
            :
            <Link to="/admin"  className="nav-link" onMouseEnter={displayUserMenu}><FontAwesomeIcon icon={faUserGear}/></Link>
          }
          <Link to="/basket" className="nav-link" className="link-to-basket"><FontAwesomeIcon icon={faBagShopping}/>{ nbItems > 0 && <span className='nbItems'>{nbItems}</span>}</Link>
        </div> }

      </nav>

      <div className='connexion-menu' onMouseLeave={closeConnexionMenu}>
        <FontAwesomeIcon icon={faXmark} onClick={closeConnexionMenu}/>
        <button><Link to='/login' onClick={closeConnexionMenu}  className="connexion-menu-link">Se connecter</Link></button>
        <button><Link to='/register' onClick={closeConnexionMenu} className="connexion-menu-link">Créer un compte</Link></button>
      </div>


      <div className='menu-user' onMouseLeave={closeUserMenu}>
        {user.isLogged && user.infos.role === "user" && <Link onClick={closeUserMenu} to='/myaccount'>Mon compte</Link>}
        {user.isLogged && user.infos.role === "admin" && <Link  onClick={closeUserMenu} to='/admin'>Admin</Link>}
        <Link to='/logout'>Déconnexion</Link>
      </div>
    </header>
  )
}

export default Header;
