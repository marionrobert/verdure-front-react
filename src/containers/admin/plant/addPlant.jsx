import { useState, useEffect } from "react";
import {createRef} from "react"
import { addOnePlant } from "../../../api/plant";
import axios from 'axios'
import { config } from "../../../config";
import { Navigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { getAllPlants } from "../../../slices/plantSlice";
import { loadPlants } from "../../../api/plant";
import { selectUser } from "../../../slices/userSlice"

const AddPlant = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState(null)
  const [quantity, setQuantity] = useState("")
  const [watering, setWatering] = useState("")
  const [brightness, setBrightness] = useState("")
  const [minTemperature, setMinTemperature] = useState("")
  const [maxTemperature, setMaxTemperature] = useState("")
  const fileInput = createRef()
  const [errorForm, setErrorForm] = useState(null)
  const token = window.localStorage.getItem('verdure-token')
  const [idNewPlant, setIdNewPlant] = useState(null)
  const [redirect, setRedirect] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorForm(null)

    if (photo === null){
      let data = {
        "name": name,
        "description": description,
        "price": price,
        "photo": "no-pict.jpg",
        "quantity": quantity,
        "watering": watering,
        "brightness": brightness,
        "minTemperature": minTemperature,
        "maxTemperature": maxTemperature
      }

      addOnePlant(data)
      .then((res)=>{
        if (res.status === 200){
          loadPlants()
          .then((answer)=>{
            console.log("answer.status", answer.status)
            if (answer.status === 200){
              dispatch(getAllPlants(answer.results))
            }
          })
          .catch(mistake => console.log(mistake))
          setIdNewPlant(res.plant.insertId)
          setRedirect(true)
        } else {
          setErrorForm(res.msg)
        }
      })
      .catch((err)=>{
        console.log(err)
      })


    } else { //une photo a été chargée
      const formData = new FormData()
      formData.append("image", photo)

      //requète axios d'envoi d'une image vers l'api
      axios.post(`${config.api_url}/api/v1/plant/pict`, formData, {headers: {"Content-Type":"multipart/form-data", "x-access-token": token}})
      .then((response) => {
        if (response.status === 200){
          // console.log("image enregistrée", response.data.url)
          let newData = {
            "name": name,
            "description": description,
            "price": price,
            "photo": response.data.url,
            "quantity": quantity,
            "watering": watering,
            "brightness": brightness,
            "minTemperature": minTemperature,
            "maxTemperature": maxTemperature
          }

          addOnePlant(newData)
          .then((res)=>{
            if (res.status === 200){
              loadPlants()
              .then((answer)=>{
                console.log("answer.status", answer.status)
                if (answer.status === 200){
                  dispatch(getAllPlants(answer.results))
                }
              })
              .catch(mistake => console.log(mistake))
              setIdNewPlant(res.plant.insertId)
              setRedirect(true)
            } else {
              setErrorForm(res.msg)
            }
          })
          .catch((err)=>{
            console.log(err)
          })
        } else {
          setErrorForm(response.msg)
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value)
        break;
      case "description":
        setDescription(e.currentTarget.value)
        break;
      case "price":
        setPrice(e.currentTarget.value)
        break;
      case "photo":
        setPhoto(fileInput.current.files[0])
        break;
      case "quantity":
        setQuantity(e.currentTarget.value)
        break;
      case "watering":
        setWatering(e.currentTarget.value)
        break;
      case "brightness":
        setBrightness(e.currentTarget.value)
        break;
      case "minTemperature":
        setMinTemperature(e.currentTarget.value)
        break;
      case "maxTemperature":
        setMaxTemperature(e.currentTarget.value)
        break;
    }
  }

  if (redirect && idNewPlant !== null){
    return <Navigate to={`/plant/details/${idNewPlant}`} />
  }

  if (user.infos.role === "admin") {
    return (
      <section className="forms">
        <h1>Ajouter une nouvelle plante</h1>

        {errorForm !== null && <p style={{color:"red"}}>{errorForm}</p>}

        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" onChange={handleChange} required/>
            <label htmlFor="description">Description</label>
            <textarea name="description" onChange={handleChange} required/>
            <label htmlFor="price">Prix</label>
            <input type="text" name="price" onChange={handleChange} required/>
            <label htmlFor="photo">Photo</label>
            <input type="file" ref={fileInput} onChange={handleChange} name="photo"/>
            <label htmlFor="quantity">Quantité en stock</label>
            <input type="text" name="quantity" onChange={handleChange} required/>
            <label htmlFor="watering">Besoin en eau (de 0 à 5)</label>
            <input type="text" name="watering" onChange={handleChange} required/>
            <label htmlFor="brightness">Besoin en luminosité (de 0 à 5)</label>
            <input type="text" name="brightness" onChange={handleChange} required/>
            <label htmlFor="minTemperature">Température minimale</label>
            <input type="text" name="minTemperature" onChange={handleChange} required/>
            <label htmlFor="maxTemperature">Température maximale</label>
            <input type="text" name="maxTemperature" onChange={handleChange} required/>
            <button type="submit">Valider</button>
        </form>

      </section>
    )
  }
}

export default AddPlant
