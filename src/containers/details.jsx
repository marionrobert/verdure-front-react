import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadOnePlant } from "../api/plant";
import {config} from "../config"

const Details = () => {
  const params = useParams()
  const [plant, setPlant] = useState(null)

  useEffect(()=>{
    loadOnePlant(params.id)
    .then((res)=>{
      setPlant(res.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [params.id])

  return (
    <>
      { plant !== null && <div className="details-plant">
        <img src={`${config.pict_url}/${plant.photo}`}/>
        <h2>{plant.name}</h2>
        <p>{plant.description}</p>
        <p>{plant.price} €</p>
        <p>En stock: {plant.quantity}</p>
        <p>Arrosage: {plant.watering}</p>
        <p>Luminosité: {plant.brigthness}</p>
        <p>Température minimum: {plant.minTemperature}°C</p>
        <p>Température maximum: {plant.maxTemperature}°C</p>
      </div>}
    </>
  )
}

export default Details;
