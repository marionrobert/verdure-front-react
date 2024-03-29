# Bienvenue sur *Verdure* : Découvrez un large choix de plantes pour habiller votre intérieur 🌻🪴
<img src="/public/images/screenshots/banner.png" alt="bannière de l'application web">

Verdure est une application web de vente en ligne de plantes d'intérieur. Ce dépôt est consacré à la **partie backend** du projet.

<br/>

## Contexte de développement 💻
Il s'agit d'un projet éducatif développé en tant que projet final de la formation "Développeur web FullStack Javascript" à la 3w Academy.

<br/>

## Installation et Configuration ⚙️🛠️

### Prérequis système :
L'application tourne actuellement sur :
- Node.js (version 16.15.1)
- Npm (version 8.11.0)

Voici la liste des packages et leur version utilisés dans ce projet :
```
"dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "jsonwebtoken": "^9.0.0",
    "nodemon": "^2.0.22",
    "promise-mysql": "^5.2.0",
    "stripe": "^12.11.0"
  }
```
<br/>

### Étapes d'installation :
1. Clonez le dépôt Git : `git clone https://github.com/marionrobert/verdure-api-back.git`
2. Assurez-vous d'avoir la stack technologique installée avec les bonnes versions.
3. Lancer la commande `npm install` pour installer les dépendances.
4. Créez un fichier **.env** à la racine du projet et ajoutez-y les variables d'environnement suivantes :
   - `SECRET` pour signer et vérifier les JSON Web Tokens (JWT)
   - `STRIPE_API_KEY_TEST` pour l'utilisation de l'api stripe en mode test. Pour obtenir cette clé, vous devez créer un compte stripe.
5. **Création et connection à la base de données** :
   - vous devez avoir un logiciel de base de données (comme MySQL Workbench, phpMyAdmin, etc.).
   - importez le fichier **marionrobert_verdure.sql** dans le logiciel de base de données et exécuter l'importation. Vérifier que la base de données a bien été créée.
   - Créez les fichiers **config.js** (pour le production) et **config-offline.js** (pour le développement) à la racine de votre projet pour y mettre les informations concernant votre DB.
   ```
   module.exports = {
       db: {
            host: "YOUR HOST",
            database: "YOUR DB",
            user: "YOUR USER",
            password: "YOUR PASSWORD"
        }
   };
   ```

6. Pour démarrer le serveur, vous avez deux options :
   - `npm start`
   - `npm dev` : cette deuxième option utilise nodemon pour actualiser le serveur à chaque modification de votre code

7. Pour prendre en main l'application, voici des identifiants de connexion :
    - Compte administrateur :
        - Adresse e-mail : admin-verdure@gmail.com
        - Mot de passe : AqwPM741*
    - Compte utilisateur :
        - Adresse e-mail : user0-test-verdure@gmail.com
        - Mot de passe : Azerty123*

<br/>

## Contenu des fichiers 📁🗃️

Le projet est organisé en plusieurs dossiers :
- **models** : ce dossier contient l'ensemble des modèles de données : *OderModel, PlantModel, UserModel*. Ces fichiers définissent des méthodes pour interagir avec la base de données et effectuer des opérations telles que la récupération, la création, la mise à jour et la suppression des entrées.
- **routes** : Ce dossier contient les fichiers de configuration des routes de l'API REST de l'application, tels que `authRoutes.js`, `userRoutes.js`, `orderRoutes.js` et `plantRoutes.js`. Chaque fichier définit des routes pour différentes fonctionnalités de l'application, en appelant les méthodes appropriées des modèles.
    - Par exemple, pour le fichier `plantRoutes`, les routes incluent la récupération de toutes les plantes, la récupération d'une seule plante par ID, l'enregistrement d'une nouvelle plante, l'ajout d'une image pour une plante, la mise à jour et la suppression d'une plante existante. Pour les routes sensibles, il utilise le middleware adminAuth pour assurer que l'utilisateur authentifié possède les autorisations nécessaires.
    - Particularité du fichier `authRoutes.js` : ce fichier gère la route liée à l'authentification dans l'application *GET /api/v1/user/checkToken* qui permet à un utilisateur authentifié de vérifier son token d'authentification et de récupérer ses informations d'utilisateur associées à partir de la base de données. Cela facilite la reconnexion automatique du frontend et permet de maintenir une session utilisateur active.
- **public** : il contient les ressources statiques, des images principales, car le css, peu conséquent, a été intégré directement dans les vues.
- les fichiers middlewares **withAuth** et **adminAuth** utilisés pour authentifier les utilisateurs et pour s'assurer qu'ils ont les autorisations nécessaires pour accéder à certaines routes.

<br/>

## Foncionnalités particulières

### Stripe
Les paiements en ligne sont gérés grâce à la méthode paymentIntents de l'api stripe, dans le fichier **orderRoutes.js** :
```
//on lie la clé privée stripe au backend pour permettre le suivi du paiement
const sk_test = process.env.STRIPE_API_KEY_TEST
const stripe = require('stripe')(sk_test)
const withAuth = require('../withAuth')
const adminAuth = require('../adminAuth')

module.exports = (app, db) => {
    const orderModel = require('../models/OrderModel')(db);
    const plantModel = require('../models/PlantModel')(db);
    const userModel = require('../models/UserModel')(db);

    [...]

    //route de gestion du paiement (va analyser le bon fonctionnement du paiement)
    app.post('/api/v1/order/payment', withAuth, async (req, res, next)=>{
      console.log("in checkpayment back, req -->", req.body)
      let order = await orderModel.getOneOrder(req.body.orderId)
      //on lance le suivi du paiement de la commande
      //on veut que stripe nous retourne une réponse d'acceptation de paiement ou non, mais tout ce qui est envoi numéro carte c'ets géré en front
      const paymentIntent = await stripe.paymentIntents.create({
        amount: order[0].totalAmount * 100, // stripe est en centimes donc on multiplie par 100
        currency: "eur", //devise du paiement,
        // payment_method: 'pm_card_visa',
        metadata: {integration_check: "accept_a_paymentt"}, //on vérifie si le paiement est accepté ou non
        receipt_email: req.body.email, //on demande à stripe d'envoyer email de confirmation du payment à l'utilisateur
      })
      res.json({client_secret: paymentIntent["client_secret"]})
    });
};

```

### Enregistrement d'image
Le code ci-dessous implémente une route API qui permet d'ajouter une image au serveur à partir du frontend. Lorsqu'une requête POST est envoyée à cette route avec une image, celle-ci est stockée dans le répertoire public/images du serveur. L'enregistrement de l'image est réalisé en utilisant la fonction mv, qui déplace l'image vers le dossier spécifié. En cas de succès, la route renvoie une réponse JSON indiquant que l'image a été correctement enregistrée, avec le nom de l'image stockée.

```
const fs = require('fs') //va nous permettre de supprimer des images locales
const adminAuth = require('../adminAuth')

module.exports = (app,db)=>{
    const plantModel = require('../models/PlantModel')(db)
     [...]

    //route d'ajout d'une image dans l'api (enregistre une image et retourne au front le nom de l'image stockée)
    app.post('/api/v1/plant/pict', adminAuth, (req, res, next) =>{
        //si on a pas envoyé de req.files via le front ou que cet objet ne possède aucune propriété
		if (!req.files || Object.keys(req.files).length === 0) {
			//on envoi une réponse d'erreur
	    	 res.json({status: 400, msg: "La photo n'a pas pu être récupérée"});
	    }
	    //la fonction mv va envoyer l'image dans le dossier que l'on souhaite.
	    req.files.image.mv('public/images/'+req.files.image.name, function(err) {
	    	// console.log('ok', '/public/images/'+req.files.image.name)
	    	//si ça plante dans la callback
		    if (err) {
		    //renvoi d'un message d'erreur
		      res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
		    }
		 });
	    //si c'est good on retourne un json avec le nom de la photo vers le front
        res.json({status: 200, msg: "image bien enregistrée!", url: req.files.image.name})
    })
    [...]
}

```

<br/>

## Dossier lié 🔗
La partie front-end de l'application est accessible [ici](https://github.com/marionrobert/verdure-front-react)
