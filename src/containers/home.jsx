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
        <h1>Bienvenue chez Verdure</h1>
        <p>Découvrez un large choix de plantes pour habiller votre intérieur.</p>
        {/* <Link to="/plants" className="banner-btn">Je découvre les plantes</Link> */}
      </div>
      { plants.length > 0 && <div className="all-plants">
        <h2>Découvrez nos nouveautés</h2>
        {plants.map(plant => {
          return (
            <div key={plant.id} className="plant-card">
            <img src={`${config.pict_url}/${plant.photo}`}/>
              <h3>{plant.name}</h3>
              <p>{plant.description.substring(0, 50)}...</p>
              <Link to={`/plants/details/${plant.id}`} className="plant-card-btn">Je découvre</Link>
              <p>{plant.description.substring(0, 50)}...</p>

            </div>
          )
        })}
      </div>}
    </>
  )
}

export default Home;
