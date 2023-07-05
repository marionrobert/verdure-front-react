import { Link } from "react-router-dom";
import { loadPlants } from "../api/plant";
import { useEffect, useState } from "react";
import {config} from "../config"


const Home = () => {
  const [plants, setPlants] = useState([])

  useEffect(()=>{
    loadPlants()
    .then((res)=>{
      setPlants(res.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [plants])

  return (
    <>
      <div className="banner">
        <h1>Bienvenue chez <span className="brand-name">Verdure</span></h1>
        <p>Découvrez un large choix de plantes pour habiller votre intérieur.</p>
        <button className="banner-btn"><Link to="/plants" >Découvrir</Link></button>

      </div>
      { plants.length > 0 && <div className="all-plants">
        <h2>Les nouveautés</h2>
        {plants.map(plant => {
          return (
            <div key={plant.id} className="plant-card">
            <img src={`${config.pict_url}/${plant.photo}`}/>
              <h3>{plant.name}</h3>
              <p>{plant.description.substring(0, 80)}...</p>
              <button className="plant-card-btn"><Link to={`/plants/details/${plant.id}`} >Je découvre</Link></button>
            </div>
          )
        })}
      </div>}
    </>
  )
}

export default Home;
