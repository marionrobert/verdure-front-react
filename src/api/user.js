import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem('verdure-token')

export function addOneUser(data){
  return axios.post(`${config.api_url}/api/v1/user/register`, data)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

export function loginUser(data){
  return axios.post(`${config.api_url}/api/v1/user/login`, data)
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

export function updateOneUser(data, id){
  const token = window.localStorage.getItem('verdure-token')
  return axios.put(`${config.api_url}/api/v1/user/update/${id}`, data, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}

export function checkMyToken(){
  const token = window.localStorage.getItem('verdure-token')
  console.log('token in checkMyToken -->', token)
  return axios.get(`${config.api_url}/api/v1/user/checkToken`, {headers: {"x-access-token": token}})
  .then((res)=>{
    return res.data
  })
  .catch((err)=>{
    console.log(err)
  })
}
