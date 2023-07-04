import axios from "axios"
import {config} from "../config"

//chargement de toutes les plantes
export function loadPlants(){
  return axios.get(`${config.api_url}/api/v1/plants`)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}


// chargement d'une plante
export function loadOnePlant(id){
  return axios.get(`${config.api_url}/api/v1/plant/${id}`)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

//
