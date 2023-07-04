import axios from "axios"
import {config} from "../config"


//chargement de toutes les commandes
export function getAllOrders() {
  return axios.get(`${config.api_url}/api/v1/orders`)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}


// chargement d'une commande avec détails du user et détails de la commande
export function getOneOrderWithDetails(id){
  return axios.get(`${config.api_url}/api/v1/orders/${id}`)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}


//création d'une nouvelle commande??????
export function addOneOrder(userId, data){
  return axios.get(`${config.api_url}/api/v1/order/save`, userId, data)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

// validation du paiement ?????
export function validatePayment(orderId){
  return axios.put(`${config.api_url}/api/v1/order/payment`, orderId)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

//changement du statut de la commande not payed --> payed
export function updatePayedStatus(id){
  return axios.put(`${config.api_url}/api/v1/order/validate/${id}`)
  .then((res)=>{
    res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

// changement du statut de la commande par l'administrateur
export function changeStatusByAdmin(id){
  return axios.put(`${config.api_url}/api/v1/order/admin-update-status/${id}`)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}
