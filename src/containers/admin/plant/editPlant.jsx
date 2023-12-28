import { useState, useEffect } from "react";
import {createRef} from "react"
import { loadOnePlant, updateOnePlant } from "../../../api/plant";
import axios from 'axios'
import { config } from "../../../config";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { getAllPlants } from "../../../slices/plantSlice";
import { loadPlants } from "../../../api/plant";
import { selectUser } from "../../../slices/userSlice"



const EditPlant = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const [plant, setPlant] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [photo, setPhoto] = useState(null)
  const [newPhoto, setNewPhoto] = useState(null)
  const [quantity, setQuantity] = useState("")
  const [watering, setWatering] = useState("")
  const [brightness, setBrightness] = useState("")
  const [minTemperature, setMinTemperature] = useState("")
  const [maxTemperature, setMaxTemperature] = useState("")
  const fileInput = createRef()
  const [errorForm, setErrorForm] = useState(null)
  const token = window.localStorage.getItem('verdure-token')
  const [redirect, setRedirect] = useState(null)

  useEffect(()=>{
    console.log("je vais charger la plante et ses infos")
    loadOnePlant(params.id)
    .then((res)=>{
      setPlant(res.results)
      setName(res.results.name)
      setDescription(res.results.description)
      setPrice(res.results.price)
      setQuantity(res.results.quantity)
      setWatering(res.results.watering)
      setBrightness(res.results.brightness)
      setMinTemperature(res.results.minTemperature)
      setMaxTemperature(res.results.maxTemperature)
      setPhoto(res.results.photo)
    })
    .catch((err)=>{
      console.log(err)
    })


  }, [params.id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorForm(null)

    console.log("newphoto -->", newPhoto)

    if (newPhoto === null){
      console.log("pas de nouvelle photo ")
      let data = {
        "name": name,
        "description": description,
        "price": price,
        "photo": photo,
        "quantity": quantity,
        "watering": watering,
        "brightness": brightness,
        "minTemperature": minTemperature,
        "maxTemperature": maxTemperature
      }
      console.log("data", data)

      updateOnePlant(data, params.id)
      .then((res)=>{
        console.log("retour update method après quand photo est nulle",res)
        if (res.status === 200){
          loadPlants()
          .then((response) => {
            if (response.status === 200) {
              dispatch(getAllPlants(response.results))
            }
          })
          .catch(mistake => console.log(mistake))
          setRedirect(true)
        } else {
          setErrorForm(res.msg)
        }
      })
      .catch((err)=>{
        console.log(err)
      })


    } else { //une nouvelle photo a été chargée
      const formData = new FormData()
      formData.append("image", newPhoto)

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

          // console.log("newdata", newData)

          updateOnePlant(newData, params.id)
          .then((res)=>{
            // console.log("retour update method quand photo n'est pas nulle", res)
            if (res.status === 200){
              loadPlants()
              .then((response) => {
                if (response.status === 200) {
                  dispatch(getAllPlants(response.results))
                }
              })
              .catch(mistake => console.log(mistake))
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
      case "newPhoto":
        setNewPhoto(fileInput.current.files[0])
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

  if (redirect){
    return <Navigate to={`/plant/details/${params.id}`} />
  }

  if (user.infos.role === "admin") {
    return (
      <section className="forms">
        <h1>Modifier les informations d'une plante</h1>
        {errorForm !== null && <p style={{color:"red"}}>{errorForm}</p>}

        { plant !== null &&
        <form onSubmit={(e)=>{handleSubmit(e)}}>
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" onChange={handleChange} defaultValue={name} required/>
            <label htmlFor="description">Description</label>
            <textarea name="description" rows="5" cols="50" onChange={handleChange} defaultValue={description} required/>
            <label htmlFor="price">Prix</label>
            <input type="text" name="price" onChange={handleChange} defaultValue={price} required/>
            <label htmlFor="photo">Photo</label>
            <input type="file" ref={fileInput} onChange={handleChange} name="newPhoto"/>
            <label htmlFor="quantity">Quantité en stock</label>
            <input type="text" name="quantity" onChange={handleChange} defaultValue={quantity} required/>
            <label htmlFor="watering">Besoin en eau (de 0 à 5)</label>
            <input type="text" name="watering" onChange={handleChange} defaultValue={watering} required/>
            <label htmlFor="brightness">Besoin en luminosité (de 0 à 5)</label>
            <input type="text" name="brightness" onChange={handleChange} defaultValue={brightness} required/>
            <label htmlFor="minTemperature">Température minimale</label>
            <input type="text" name="minTemperature" onChange={handleChange} defaultValue={minTemperature} required/>
            <label htmlFor="maxTemperature">Température maximale</label>
            <input type="text" name="maxTemperature" onChange={handleChange} defaultValue={maxTemperature} required/>
            <button type="submit">Valider</button>
        </form>
        }
      </section>
    )
  }

}

export default EditPlant
