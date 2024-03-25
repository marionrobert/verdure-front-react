import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart} from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
      <footer>
          <a href="https://www.linkedin.com/in/marion-robert-" target="_blank"><FontAwesomeIcon icon={faLinkedin}/></a>
          <p>Created by Marion Robert </p>
          <a href="https://github.com/marionrobert" target="_blank"><FontAwesomeIcon icon={faGithub}/></a>
      </footer>
  )
}

export default Footer
