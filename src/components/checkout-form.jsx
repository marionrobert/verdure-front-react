import {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {checkPayment, updatePayedStatusOrder} from '../api/order'
import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../slices/userSlice'
import {selectBasket, cleanBasket} from '../slices/basketSlice'

const CheckoutForm = (props) => {

    const [error, setError] = useState(false)
    const [redirectSuccess, setRedirectSuccess] = useState(false)
    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const stripe = useStripe() //on va pouvoir utiliser les fonctions de l'api stripe
    const elements = useElements() //on va pouvoir utiliser des éléments de consommation de la carte

    //fonction de paiement lors de la validation de la CB
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("coucou CB")
        //si les fonctionnalitées de paiement de stripe ou du terminal de paiement ne sont pas bien connectés
        if(!stripe || !elements){
            setError("Oups un problème est survenue avec le terminal de paiement!")
            return
        }

        //je récupère l'email de l'utilisateur qui paye et surtout le numéro de commande pour installer le suivi de commande sécurisé.
        let data = {
            email: user.infos.email,
            orderId: props.orderId
        }
        console.log("ESSAI")
        //gestion de paiement via stripe
        //on va checker via stripe dans le back-end si le paiement est réalisable
        const paymentAuth = await checkPayment(data)

        if(paymentAuth.status === 500){
            setError("Echec du paiement")
        }
        //on stock la réponse de la tentative de paiement vers stripe dans une variable qui va retourner une clé sécurisée
        const secret = paymentAuth.client_secret
        console.log("client secret", secret)

        //on envoi la demande de paiement
        const payment = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: user.infos.email
                }
            }
        })

        //payment va renvoyer une réponse (succés ou echec de paiement)
        console.log(payment)
        //gestion des erreurs
        if(payment.error){
            setError(payment.error.message)
        }else{
            //si le paiement est réussi
            if(payment.paymentIntent.status === "succeeded"){
                console.log("Money is in the bank bro!")

                let data = {
                    orderId: props.orderId,
                    status: "payed"
                }
                //on enregistre dans la bdd que la status de sa commande est payée
                updatePayedStatusOrder(data)
                .then((res)=>{
                    if(res.status === 200){
                        setRedirectSuccess(true)
                    }
                })
                .catch(err=>console.log(err))
            }
        }
    }

    if(redirectSuccess){
        return <Navigate to="/success" />
    }
    return (
        <section>
            {error !== null && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement
                    option={{
                        style: {
                            base: {
                                color: "#32325d",
                                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                fontSmoothing: "antialiased",
                                fontSize: "16px",
                                "::placeholder": {
                                color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#fa755a",
                                iconColor: "#fa755a",
                            }
                        }
                    }}
                />
                <button disabled={props.stripe}>Payer</button>
            </form>
        </section>
    )
}

export default CheckoutForm
