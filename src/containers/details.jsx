import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadOnePlant } from "../api/plant";
import {config} from "../config";

import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faDroplet, faSun, faTemperatureLow, faTemperatureHigh, faCartPlus } from "@fortawesome/free-solid-svg-icons"

//import des states globales product et basket et de leurs actions (ajout au panier, chargement des produits)
import { selectBasket, updateBasket  } from '../slices/basketSlice';
//on importer nos fonction pour lire ou modifier nos states globales présentes dans le store de redux
import { useSelector, useDispatch } from 'react-redux';

const Details = () => {
  const params = useParams()
  const [plant, setPlant] = useState(null)
  const [chosenQuantity, setChosenQuantity] = useState(1)
  const currentBasket = useSelector(selectBasket)
  const dispatch = useDispatch()

  useEffect(()=>{
    loadOnePlant(params.id)
    .then((res)=>{
      setPlant(res.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [params.id])

  const handleChange= (e) => {
    if (e.currentTarget.value !== ""){
      setChosenQuantity(parseInt(e.currentTarget.value))
    }
  }

  const addToBasket = (e, oldBasket, newProduct) => {
    e.preventDefault()
    // console.log("addtobasket has been triggered", chosenQuantity, oldBasket, newProduct)

    //la state lorsqu'on la récup de redux est en mode read only (lecture seule)
    //je transforme l'objet en format json puis le retransforme en objet pour le stocker dans myBasket. Il est maintenant modifiable
    let newBasket = JSON.parse(JSON.stringify(oldBasket));
    // console.log("newbasket", newBasket)

    //on check si le produit que l'on veut mettre dans le panier existe déjà (findIndex)
    const index = newBasket.findIndex(product => product.id === newProduct.id)
    // console.log(index)
    if ( index === -1){
      // on ajoute la propriété quantityInCart à l'objet newproduct(plant)
      newProduct.quantityInCart = chosenQuantity
      //on push dans le panier le nouveau produit
      newBasket.push(newProduct)

      //on dispatch dans le store
      dispatch(updateBasket(newBasket))

    } else { //sinon
      //on met à jour la quantityInCart sur le produit déjà présent
      newBasket[index].quantityInCart += chosenQuantity

      //on dispatch le panier dans le store
      dispatch(updateBasket(newBasket))
    }
  }

  return (
    <>
      { plant !== null && <div className="details-plant">
        <img src={`${config.pict_url}/${plant.photo}`}/>
        <div className="details-plant-infos">
          <h2>{plant.name}</h2>
          <p>{plant.description}</p>
          <p>{plant.price} €</p>
          <p>En stock: {plant.quantity}</p>
          <p><FontAwesomeIcon icon={faDroplet}/>Arrosage: {plant.watering}</p>
          <p><FontAwesomeIcon icon={faSun}/>Luminosité: {plant.brightness}</p>
          <p><FontAwesomeIcon icon={faTemperatureLow}/>Température minimum: {plant.minTemperature}°C</p>
          <p><FontAwesomeIcon icon={faTemperatureHigh}/>Température maximum: {plant.maxTemperature}°C</p>
        </div>
        <form onSubmit={(e)=>{addToBasket(e, currentBasket.basket, plant)}}>
          <input name="quantity" placeholder="1" defaultValue={chosenQuantity} onChange={(e)=>{handleChange(e)}}/>
          <button>Ajouter au panier <FontAwesomeIcon icon={faCartPlus}/></button>
        </form>
      </div>
      }
    </>
  )
}

export default Details;
