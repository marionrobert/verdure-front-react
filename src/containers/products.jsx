import { Link } from "react-router-dom"
import ArticleProduct from "../components/article-product"

//on importer nos fonction pour lire ou modifier nos states globales présentes dans le store de redux
import {useSelector, useDispatch} from "react-redux"
//import des states globales product et basket et de leurs actions (ajout au panier, chargement des produits)
import {selectBasket, updateBasket} from "../slices/basketSlice"
import { selectPlants } from "../slices/plantSlice";

const Products = () =>{
  const plants = useSelector(selectPlants)

  return (
    <>
      { plants.plants.length > 0 && <section className="all-plants">
        <h1>Toutes nos plantes d'intérieur</h1>
        {plants.plants.map(plant => {
          return <ArticleProduct key={plant.id} product={plant}/>
        })}
      </section>}
    </>
  )
}

export default Products
