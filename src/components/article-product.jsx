import {config} from "../config"
import {Link} from "react-router-dom"

const ArticleProduct = (props) => {
  const product = props.product


  return (
    <article className="plant-card">
    <img src={`${config.pict_url}/${product.photo}`}/>
      <h3>{product.name}</h3>
      <p>{product.description.substring(0, 80)}...</p>
      <button className="plant-card-btn"><Link to={`/plant/details/${product.id}`} >Je découvre</Link></button>
    </article>
  )
}

export default ArticleProduct
