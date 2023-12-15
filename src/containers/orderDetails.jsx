import { useEffect, useState } from "react"
import { getOneOrder } from "../api/order"
import { useParams } from "react-router-dom";
import moment from "moment";
import { config } from "../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux"
import { selectUser } from "../slices/userSlice";


const OrderDetails = () => {
  const params = useParams()
  const [order, setOrder] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  const [userData, setUserData] = useState(null)
  const [status, setStatus] = useState("")
  const user = useSelector(selectUser)

  useEffect(()=>{
    getOneOrder(params.id)
    .then((res)=>{
      if (res.status === 200){
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

        { user.infos.role === "admin" && <article>
          <h2>Identité du client: </h2>
          <p>{userData.firstName} {userData.lastName}</p>
        </article>
        }

        <h2><FontAwesomeIcon icon={faLocationDot}/> Adresse de livraison :</h2>
        <p> {userData.address} {userData.zip} {userData.city}</p>

        <h2>Détails de la commande</h2>
        <p>Passée le {moment(order.creationTimestamp).local("fr").format("DD/MM/YYYY")}</p>
        <p>Statut: {status}</p>

        <h2>Montant total de la commande: {order.totalAmount} €</h2>

        <ul className="order-all-items">
          {orderDetails.map((item=>{
            return (
              <li  key={item.id} className='order-item' >
                { item.photo !== "" ? <img src={`${config.pict_url}/${item.photo}`}/> : <img src={`${config.pict_url}/no-pict.jpg`}/>}

                <div className="order-item-infos">
                  <h3>{item.name}</h3>
                  <div className="change-quantity-zone">
                    <p>Quantité : {item.quantity}</p>
                  </div>
                  <p id="price">{item.total} €</p>
                </div>
              </li>

            )
          }))
          }
        </ul>

      </section>
    )
  }

}

export default OrderDetails
