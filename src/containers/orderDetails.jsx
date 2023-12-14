import { useEffect, useState } from "react"
import { getOneOrder } from "../api/order"
import { useParams } from "react-router-dom";
import moment from "moment";

const OrderDetails = () => {
  const params = useParams()
  const [order, setOrder] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  const [userData, setUserData] = useState(null)
  const [status, setStatus] = useState("")

  useEffect(()=>{
    getOneOrder(params.id)
    .then((res)=>{
      setOrder(res.order)
      setOrderDetails(res.orderDetails)
      setUserData(res.dataUser)

      switch (order.status){
        case "payed":
          setStatus("payée")
        break;
        case "not_payed":
          setStatus("en attente de paiement")
        break;
        case "shipped":
          setStatus("expédiée")
        break;
        case "in_delivery":
          setStatus("en cours de livraison")
        break;
        case "delivered":
          setStatus("livrée")
        break;
        case "finished":
          setStatus("terminée")
        break;
        default:
          setStatus("statut inconnu");
        break;
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [params.id])

    useEffect(() => {
      if (order) {
        switch (order.status) {
          case "payed":
            setStatus("payée");
            break;
          case "not_payed":
            setStatus("en attente de paiement");
            break;
          case "shipped":
            setStatus("expédiée");
            break;
          case "in_delivery":
            setStatus("en cours de livraison");
            break;
          case "delivered":
            setStatus("livrée");
            break;
          case "finished":
            setStatus("terminée");
            break;
          default:
            setStatus("statut inconnu");
            break;
        }
      }
    }, [order]);


  if (order !== null){
    return (
      <section className="details-order">
        <h1>Commande n° {order.id}</h1>
        <h2>Informations concernant le client</h2>
        <p>{userData.firstName} {userData.lastName}</p>
        <p>{userData.address} {userData.zip} {userData.city}</p>
        <h2>Détails de la commande</h2>
        <p>Passée le {moment(order.creationTimestamp).local("fr").format("DD/MM/YYYY")}</p>
        <p>Statut actuel: {status}</p>
        <p>Montant total de la commande: {order.totalAmount} €</p>
        <table>
          <thead>
            <tr>
              <td>Id de la plante</td>
              <td>Quantité commandée</td>
              <td>Total de la ligne de la commande</td>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map(element=>{
              return (
                <tr key={element.id}>
                  <td>{element.plant_id}</td>
                  <td>{element.quantity}</td>
                  <td>{element.total} €</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    )
  }

}

export default OrderDetails
