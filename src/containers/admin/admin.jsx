import { useSelector, useDispatch } from "react-redux"
import { getAllPlants, selectPlants } from "../../slices/plantSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faSquarePen, faEye, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { getAllOrders, updateOrderStatusByAdmin } from "../../api/order"
import moment from "moment"
import { Link } from "react-router-dom"
import { deleteOnePlant, loadPlants } from "../../api/plant"

const Admin = () => {
  const plants = useSelector(selectPlants)
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch()
  const [successPlant, setSuccessPlant] = useState(null)
  const [errorPlant, setErrorPlant] = useState(null)
  const [orderPlant, setOrderPlant] = useState(null)

  useEffect(()=> {
    getAllOrders()
    .then((res)=>{
      setOrders(res.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [orders])

  const deletePlant = (id) => {
    setSuccessPlant(null)
    deleteOnePlant(id)
    .then((res)=>{
      // console.log(res)
      if (res.status === 200){
        setSuccessPlant("La plante a bien été supprimée")
        loadPlants()
        .then((response)=>{
          if(response.status === 200){
            dispatch(getAllPlants(response.results))
          } else {
            console.log("erreur chargement des plantes")
          }
        })
        .catch((error)=>{
          console.log(error)
        })
      } else {
        setErrorPlant("La plante n'a pas pu être supprimée")
      }
    })
    .catch((err)=>{
      setErrorPlant("La plante n'a pas pu être supprimée")
      console.log(err)
    })
  }

  const handleChange = (e, id) => {
    console.log(e.currentTarget.value)
    updateOrderStatusByAdmin(id, {"status": e.currentTarget.value})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  return (
    <div className="admin-dashboard">
      <button className="logout"><Link to="/logout"><FontAwesomeIcon icon={faRightFromBracket}/> Déconnexion</Link></button>
      <h1>Administration</h1>
        <section className="manage-all-plants">
          <h2>Gérer les produits</h2>
          {successPlant !== null && <p style={{color: "green"}}>{successPlant}</p>}
          {plants.plants && plants.plants.length > 0 &&
            <table>
              <thead>
                <tr>
                  <td>Nom</td>
                  <td>Quantité</td>
                  <td>Prix</td>
                  <td>Gérer</td>
                </tr>
              </thead>
              <tbody>
                {plants.plants.map((plant) => {
                  return (
                    <tr key={plant.id}>
                      <td>{plant.name}</td>
                      <td>{plant.quantity}</td>
                      <td>{parseFloat(plant.price)} €</td>
                      <td><FontAwesomeIcon icon={faTrashCan} onClick={()=>{deletePlant(plant.id)}}/><Link to={`/plant/update/${plant.id}`}><FontAwesomeIcon icon={faSquarePen}/></Link></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
          <button className="create-product"><Link to="/plant/add">Créer un nouveau produit</Link></button>
        </section>

        {orders && orders.length > 0 && <section className="manage-all-plants">
          <h2>Gérer les commandes</h2>
          <table>
            <thead>
              <tr>
                <td>Montant</td>
                <td>Date</td>
                <td>Mette à jour le statut</td>
                <td>Voir</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.totalAmount} €</td>
                    <td>{moment(order.creationTimestamp).locale("fr").format("DD/MM/YYYY")}</td>
                    <td>
                      <select name="status" onChange={(e)=>{handleChange(e, order.id)}}>
                          <option>{order.status}</option>
                          <option value="expédiée" >Expédiée</option>
                          <option value="en livraison">En livraison</option>
                          <option value="livrée">Livrée</option>
                          <option value="terminée">Terminée</option>
                      </select>
                    </td>
                    <td><Link to={`/order/details/${order.id}`}><FontAwesomeIcon icon={faEye}/></Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        }

    </div>
  )
}

export default Admin
