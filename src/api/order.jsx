import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem('verdure-token')

//création d'une nouvelle commande??????
export function saveOneOrder(data){
  const token = window.localStorage.getItem('verdure-token')
  console.log("data & token", data, token)
  return axios.post(`${config.api_url}/api/v1/order/save`, data, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

// validation du paiement ?????
export function checkPayment(data){
  return axios.put(`${config.api_url}/api/v1/order/payment`, data, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

//chargement de toutes les commandes
export function getAllOrders() {
  return axios.get(`${config.api_url}/api/v1/orders`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}


// chargement d'une commande avec détails du user et détails de la commande
export function getOneOrder(id){
  return axios.get(`${config.api_url}/api/v1/order/${id}`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}


//changement du statut de la commande not payed --> payed
export function updatePayedStatusOrder(id, data){
  return axios.put(`${config.api_url}/api/v1/order/validate/${id}`, data, {headers: {"x-access-token": token}})
  .then((res)=>{
    res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

// changement du statut de la commande par l'administrateur
export function updateOrderStatusByAdmin(id, data){
  console.log("in order.jsx", data, id)
  return axios.put(`${config.api_url}/api/v1/order/admin-update-status/${id}`, data, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}
