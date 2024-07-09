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

// ajout d'une plante
export function addOnePlant(data){
  const token = window.localStorage.getItem('verdure-token')
  return axios.post(`${config.api_url}/api/v1/plant/save`, data, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}


// modification d'une plante
export function updateOnePlant(data, id){
  const token = window.localStorage.getItem('verdure-token')
  return axios.put(`${config.api_url}/api/v1/plant/update/${id}`, data, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}


// suppresion d'une plante
export function deleteOnePlant(id){
  const token = window.localStorage.getItem('verdure-token')
  return axios.delete(`${config.api_url}/api/v1/plant/delete/${id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}
