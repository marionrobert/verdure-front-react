import { useSelector, useDispatch } from "react-redux"
import { getAllPlants, selectPlants } from "../../slices/plantSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faSquarePen } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { getAllOrders } from "../../api/order"
import moment from "moment"
import { Link } from "react-router-dom"

const Admin = () => {
  const plants = useSelector(selectPlants)
  const [orders, setOrders] = useState('')

  useEffect(()=> {
    getAllOrders()
    .then((res)=>{
      setOrders(res.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  })

  return (
    <div className="admin-dashboard">
      <h1>Bienvenue dans le dashboard de Verdure</h1>
      <Link to="/plant/add">Ajouter une nouvelle plante à votre magasin</Link>
        {plants.plants.length > 0 && <section className="manage-all-plants">
          <h2>Gérer toutes vos plantes</h2>
          <table>
            <thead>
              <tr>
                <td>Nom</td>
                <td>Quantité</td>
                <td>Prix unitaire</td>
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
                    <td><FontAwesomeIcon icon={faTrashCan}/><FontAwesomeIcon icon={faSquarePen}/></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        }

        {orders.length > 0 && <section className="manage-all-plants">
          <h2>Gérer toutes les commandes</h2>
          <table>
            <thead>
              <tr>
                <td>Id du client</td>
                <td>Montant total</td>
                <td>Date</td>
                <td>Statut</td>
                <td>Gérer</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.user_id}</td>
                    <td>{order.totalAmount} €</td>
                    <td>{moment(order.creationTimestamp).locale("fr").format("DD/MM/YYYY")}</td>
                    <td>{order.status}</td>
                    <td><FontAwesomeIcon icon={faSquarePen}/></td>
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
