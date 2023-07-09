import { Link } from "react-router-dom";
import ArticleProduct from "../components/article-product"
import { useEffect } from "react";

//on importer nos fonction pour lire ou modifier nos states globales présentes dans le store de redux
import {useSelector, useDispatch} from "react-redux"
//import des states globales product et basket et de leurs actions (ajout au panier, chargement des produits)
import {selectBasket, updateBasket} from "../slices/basketSlice"
import { selectPlants } from "../slices/plantSlice";


const Home = () => {
  //récupération des states pour lecture
  const allPlants = useSelector(selectPlants)
  const currentBasket = useSelector(selectBasket)

  //on initialise notre fonction dispatcher pour modifier une state
  const dispatch = useDispatch()

  return (
    <>
      <div className="banner">
        <h1>Bienvenue chez <span className="brand-name">Verdure</span></h1>
        <p>Découvrez un large choix de plantes pour habiller votre intérieur.</p>
        <button className="banner-btn"><Link to="/plants" >Découvrir</Link></button>

      </div>
      { allPlants.plants.length > 0 && <section className="all-plants">
        <h2 className="new-plants">Les nouveautés</h2>
        {allPlants.plants.slice(0, 8).map(plant => {
          return <ArticleProduct key={plant.id} product={plant}/>
        })}
      </section>}
      <button className="btn-discover-all-plants"><Link to="/plants" >Je découvre toutes les plantes</Link></button>
    </>
  )
}

export default Home;
