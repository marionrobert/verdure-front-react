import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import { config } from "../config"


const Header = () => {
  const [token, setToken] = useState("")
  // après connexion, redirection vers home --> problème rechargement de la navbar --> "seconnecter" --> "mon compte"
  //dans le store user isLogged = false 

  useEffect(()=>{
    setToken(window.localStorage.getItem('verdure-token'))
  }, [token])

  return (
    <header>
      <nav id="nav-menu">
        <div className="brand">
          <Link to="/"><img src={`${config.pict_url}/icons/plant_flowerpot.svg`} className="icon"/></Link>
          <p>Verdure</p>
        </div>

        <div className="nav-links">
          { token === null && <Link to='/login'  className="nav-link"> Se connecter</Link>}
          { token !== null && <Link to='/profil'  className="nav-link"> Mon compte</Link>}
          {/* <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome}/> Accueil</Link> */}
          <Link to="/plants" className="nav-link">Nos plantes</Link>
          <Link to="#" className="nav-link"><FontAwesomeIcon icon={faBasketShopping}/></Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;
