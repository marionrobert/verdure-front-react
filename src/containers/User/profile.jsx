import {selectUser, connectUser} from '../../slices/userSlice'
import {useSelector} from 'react-redux'
import { updateOneUser} from '../../api/user'
import { getAllOrdersByUser } from '../../api/order'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faEye } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from "moment"

const Profile = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] =useState("")
  const [zip, setZip] =useState("")
  const [city, setCity] =useState("")
  const [phone, setPhone] =useState("")
  const [orders, setOrders] = useState([])
  const [errorLoadingOrders, setErrorLoadingOrders] = useState(null)

  useEffect(()=>{
    setErrorLoadingOrders(null)
    setFirstName(user.infos.firstName)
    setLastName(user.infos.lastName)
    setAddress(user.infos.address)
    setZip(user.infos.zip)
    setCity(user.infos.city)
    setPhone(user.infos.phone)

    getAllOrdersByUser(parseInt(user.infos.id))
    .then((res) => {
      if (res.status === 200){
        setOrders(res.orders)
      } else {
        setErrorLoadingOrders("Une erreur est survenue lors du chargement de vos commandes.")
      }
    })
    .catch((err) => {
      console.log(err)
      setErrorLoadingOrders("Une erreur est survenue lors du chargement de vos commandes.")
    })

  }, [user])


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
    <section className='profile'>
    <div>
      <Link className='logout' to="/logout"><FontAwesomeIcon icon={faRightFromBracket}/> Déconnexion</Link>
    </div>
      <h1>Mon compte</h1>
      <article className='user-data'>
        <h2>Mes informations</h2>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <label htmlFor="firstName">Mon prénom</label>
          <input type="text" name="firstName" onChange={handleChange} defaultValue={firstName} placeholder="Prénom" required/>
          <label htmlFor="lastName">Mon nom</label>
          <input type="text" name="lastName" onChange={handleChange} defaultValue={lastName} placeholder="Nom" required/>
          <label htmlFor="address">Mon adresse complète</label>
          <input type="text" name="address" onChange={handleChange} defaultValue={address} placeholder="Adresse complète" required/>
          <label htmlFor="zip">Mon code postal</label>
          <input type="text" name="zip" onChange={handleChange} defaultValue={zip} placeholder="Code postal" required/>
          <label htmlFor="city">Ma ville</label>
          <input type="text" name="city" onChange={handleChange} defaultValue={city} placeholder="Ville" required/>
          <label htmlFor="phone">Mon numéro de téléphone</label>
          <input type="text" name="phone" onChange={handleChange} defaultValue={phone} placeholder="Numéro de téléphone" required/>
          <button className='update-data' type="submit">Modifier mes informations</button>
        </form>
      </article>
      <article className='user-orders'>
        <h2>Mes commandes</h2>
        { errorLoadingOrders !== null && <p className="error">{errorLoadingOrders}</p>}
        { orders.length > 0 ?
          <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Montant</td>
                <td>Statut</td>
                <td>Voir</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{moment(order.creationTimestamp).locale("fr").format("DD/MM/YYYY")}</td>
                    <td>{order.totalAmount} €</td>
                    <td>
                      {
                        order.status === "payed" ? "Payée" :
                        order.status === "delivered" ? "Livrée" :
                        order.status === "in_delivery" ? "En cours de livraison" :
                        order.status === "finished" ? "Terminée" :
                        order.status === "not_payed" ? "En attente de paiement":
                        order.status === "shipped" ? "Expédiée":
                        "Pas d'information"
                      }
                    </td>
                    <td><Link to={`/order/details/${order.id}`}><FontAwesomeIcon icon={faEye}/></Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table> :
          <p>Vous n'avez pas encore encore commandé chez nous, n'attendez plus! </p>}
      </article>

    </section>
  )
}

export default Profile
