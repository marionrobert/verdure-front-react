import {selectUser, connectUser} from '../../slices/userSlice'
import {useSelector} from 'react-redux'
import { updateOneUser, checkMyToken } from '../../api/user'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Profil = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] =useState("")
  const [zip, setZip] =useState("")
  const [city, setCity] =useState("")
  const [phone, setPhone] =useState("")

  useEffect(()=>{
    setFirstName(user.infos.firstName)
    setLastName(user.infos.lastName)
    setAddress(user.infos.address)
    setZip(user.infos.zip)
    setCity(user.infos.city)
    setPhone(user.infos.phone)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    //j'appelle la fonction updateOneUser
    let data = {
      "firstName": firstName,
      "lastName": lastName,
      "address": address,
      "zip": zip,
      "city": city,
      "phone": phone
    }
    updateOneUser(data, user.infos.id)
    .then((res)=>{
      //je mets à jour le store de user
      let updatedUser = res.newUser
      updatedUser.token = window.localStorage.getItem("verdure-token")
      dispatch(connectUser(updatedUser))
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleChange = (e) =>{
    switch (e.currentTarget.name) {
      case "firstName":
        setFirstName(e.currentTarget.value)
        break;
      case "lastName":
        setLastName(e.currentTarget.value)
        break;
      case "address":
        setAddress(e.currentTarget.value)
        break;
      case "zip":
        setZip(e.currentTarget.value)
        break;
      case "city":
        setCity(e.currentTarget.value)
        break;
      case "phone":
        setPhone(e.currentTarget.value)
        break;
    }
  }

  return (
    <>
      <h1>Mon compte</h1>
      <h2>Mes informations</h2>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
      <label htmlFor="firstName">Votre prénom</label>
      <input type="text" name="firstName" onChange={handleChange} defaultValue={firstName} placeholder="Prénom" required/>
      <label htmlFor="lastName">Votre nom</label>
      <input type="text" name="lastName" onChange={handleChange} defaultValue={lastName} placeholder="Nom" required/>
      <label htmlFor="address">Votre adresse complète</label>
      <input type="text" name="address" onChange={handleChange} defaultValue={address} placeholder="Adresse complète" required/>
      <label htmlFor="zip">Votre code postal</label>
      <input type="text" name="zip" onChange={handleChange} defaultValue={zip} placeholder="Code postal" required/>
      <label htmlFor="city">Votre ville</label>
      <input type="text" name="city" onChange={handleChange} defaultValue={city} placeholder="Ville" required/>
      <label htmlFor="phone">Votre numéro de téléphone</label>
      <input type="text" name="phone" onChange={handleChange} defaultValue={phone} placeholder="Numéro de téléphone" required/>
      <button type="submit">Modifier mes informations</button>
    </form>
    </>
  )
}

export default Profil
