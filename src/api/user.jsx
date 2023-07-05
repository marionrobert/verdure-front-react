import axios from 'axios'
import {config} from '../config'
// const token = window.localStorage.getItem('verdure-token')?????

export function addOneUser(data){
  return axios.post(`${config.api_url}/user/register`, data)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

export function loginUser(data){
  return axios.post(`${config.api_url}/user/login`, data)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

export function updateProfil(data, id){
  return axios.put(`${config.api_url}/user/update/${id}`, data)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

export function checkMyToken(){
  return axios.get(`${config.api_url}/user/checkToken`)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}
