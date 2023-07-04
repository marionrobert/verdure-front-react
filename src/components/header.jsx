import { Link } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faGears, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { config } from "../config"

const Header = () => {
  return (
    <header>
      <nav id="nav-menu">
        <div className="brand">
          <Link to="/"><img src={`${config.pict_url}/icons/plant_flowerpot.svg`} className="icon"/></Link>
          <p>Verdure</p>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome}/> Accueil</Link>
          <Link to="/plants" className="nav-link">Nos plantes</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;
