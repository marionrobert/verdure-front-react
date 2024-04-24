(english below)

# Bienvenue sur *Verdure* : Découvrez un large choix de plantes pour habiller votre intérieur 🌻🪴
<img src="/public/screenshots/banner.png" alt="bannière de l'application web">

Verdure est une application web de vente en ligne de plantes d'intérieur. L'application est disponible uniquement en français. Ce dépôt est consacré à la **partie frontend** de ce projet.


<br/>
<br/>

## Contexte de développement 💻
Il s'agit d'un projet éducatif développé lors de la formation "Développeur web FullStack Javascript" à la 3w Academy.

<br/>
<br/>

## Installation et Configuration ⚙️🛠️

### Prérequis système :
L'application tourne actuellement sur :
- Node.js (version 16.15.1)
- Npm (version 8.11.0)

Voici la list des packages et eur leur verion utilisés dans ce projet :
```javacsript
"dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.4.0",
    "@fortawesome/free-brands-svg-icons": "^6.4.0",
    "@fortawesome/free-regular-svg-icons": "^6.4.0",
    "@fortawesome/free-solid-svg-icons": "^6.4.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@reduxjs/toolkit": "^1.9.5",
    "@stripe/react-stripe-js": "^2.4.0",
    "@stripe/stripe-js": "^1.54.2",
    "axios": "^1.4.0",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.1",
    "react-router-dom": "^6.14.1",
    "redux": "^4.2.1",
    "redux-thunk": "^2.4.2"
  }
```
<br/>

### Étapes d'installation :

1. Clonez le dépôt Git : `git clone https://github.com/marionrobert/verdure-front-react`.
2. Assurez-vous d'avoir les bonnes versions de la stack technologique installées.
3. Créez un fichier **.env** dans lequel vous y mettrez les variables d'environnement `STRIPE_SECRET_KEY` et `STRIPE_PUBLIC_KEY` pour interragir avec l'api stripe. Vous obtiendrez ces clés en vous créant un compte stripe.
4. Exécutez la commande `npm install` pour installer les dépendances.
5. Suivez les étapes d'installation et de configuration du backend, puis lancez le serveur de l'API backend avec la commande `npm run dev`. Toutes les instructions sont disponibles sur le dépôt du backend de l'application [ici](https://github.com/marionrobert/verdure-api-back).
6. Ensuite, lancez le serveur de l'interface utilisateur avec la commande `npm run dev`.

<br/>
<br/>

## Contenu des fichiers 📁🗃️

Le projet est organisé en plusieurs dossiers et fihciers présents dans le dossier principal **src** (présent à la racine) :
- dossier **api** : contient des fichiers qui gèrent les requêtes HTTP vers l'API de l'application. Par exemple, dans le fichier plant.jsx, plusieurs fonctions sont définies pour interagir avec les ressources liées aux plantes. Ces fonctions utilisent Axios pour effectuer des requêtes HTTP vers l'API, en récupérant, en créant, en mettant à jour ou en supprimant des plantes. Les fonctions prennent en charge l'ajout de jetons d'authentification pour les requêtes sécurisées et manipulent les réponses et les erreurs renvoyées par l'API.
- dossier **components** : contient des fichiers qui définissent des composants réutilisables à travers l'application. Il y a 3 composants : PlantCard.jsx, Footer.jsx, Header.jsx
- dossier **containers** : contrairement aux composants réutilisables dans le dossier "components", les composants dans le dossier "containers" sont spécifiques à des vues de l'application (exemple `Home.jsx`) ou des fonctionnalités particulières (comme `CheckoutForm.jsx`).
- dossier **helpers** : contient le fichier require-data-auth.jsx qui définit un composant React qui agit en tant que Higher-Order Component (HOC) pour contrôler les données et la sécurité des routes. Il gère la récupération des paramètres de la route, l'extraction des états depuis le store Redux, la gestion de la redirection en fonction de l'authentification de l'utilisateur, et effectue des appels API pour vérifier l'authenticité du token d'utilisateur. En fonction de l'état de l'authentification et des rôles de l'utilisateur, il redirige vers les pages appropriées ou affiche le composant enfant avec les paramètres transmis.
- dossier **slices** : contient plusieurs fichiers associés à la gestion de l'état global de l'application à l'aide de Redux, un gestionnaire d'état pour les applications JavaScript.
  - **store.jsx** : contient la configuration du magasin Redux de l'application, qui combine tous les "slices" définis dans l'application pour créer un seul et unique "store" gérant l'état global de l'application.
  - **plantSlice.jsx**: définit un "slice" pour gérer l'état lié aux plantes. Il contient des actions, des reducers et des sélecteurs pour manipuler et récupérer des données liées aux plantes.
  - **basketSlice.jsx** : définit un "slice" pour gérer l'état du panier dans l'application, stockant les produits ou articles sélectionnés par l'utilisateur. Il inclut des actions pour mettre à jour et nettoyer le panier, ainsi que des fonctions pour calculer le montant total du panier.
  - **userSlice.jsx** : définit un "slice" pour gérer l'état de l'utilisateur dans l'application, stockant les informations de connexion telles que l'identifiant de l'utilisateur et le token d'authentification. Il contient des actions pour définir l'utilisateur et le déconnecter, ainsi que des sélecteurs pour récupérer les informations de l'utilisateur.
- fichier **App.jsx** : définit le composant racine de l'application. Il organise les routes et les composants de l'application en utilisant React Router pour la navigation. Il inclut également les en-têtes et pieds de page de l'application, ainsi que des routes pour différentes fonctionnalités telles que la gestion des activités, les réservations, l'authentification des utilisateurs et les fonctionnalités administratives.
- fichier **App.scss** : contient le CSS applicable à l'ensemble de l'application. Il suit la méthode "mobile first", ce qui signifie que le CSS pour les formats mobiles est défini en premier, suivi des adaptations pour les formats tablette et ordinateur. Le CSS est structuré par containers et composants.
- fichier **config.js** : contient un objet config qui stocke les informations nécessaires à l'application, telles que les URL de l'API et les URL des images. Actuellement, il est configuré pour utiliser des URL locales (http://localhost:9000), mais il existe également une configuration en commentaire pour une utilisation avec un environnement de développement IDE (http://marionrobert.ide.3wa.io:9000).
- fichier **main.jsx** : c'est le point d'entrée de l'application React. Il importe les modules nécessaires, tels que React, ReactDOM, et les composants App, BrowserRouter, Provider, et store. Ensuite, il rend l'application en encapsulant le composant App dans un contexte de Redux fourni par Provider et un routeur fourni par BrowserRouter, le tout enveloppé dans un mode strict de React.

<br/>

A la racine du projet, il existe également:
- un dossier **public** qui contient uniquement l'image servant de favicon ainsi que les screenshots de l'applciation web utilisées dans ce fichier README.
- un fichier **index.html** qui définit la structure de base de la page web de l'application React, incluant des métadonnées telles que le titre, la description, des liens vers des ressources externes comme des feuilles de style et des scripts, ainsi que le conteneur principal où l'application sera rendue.
- un fichier **vite.config.js** quiconfigure Vite pour prendre en charge React en utilisant le plugin @vitejs/plugin-react. Il exporte une configuration par défaut qui spécifie l'utilisation du plugin React.

<br/>
<br/>

## Responsive design et méthode "mobile first"
Le responsive design consiste à créer des sites Web et des applications qui s'adaptent automatiquement à différentes tailles d'écran et types d'appareils, offrant ainsi une expérience utilisateur optimale sur ordinateurs de bureau, tablettes et smartphones. La méthode mobile first est une approche de conception qui commence par concevoir pour les appareils mobiles, puis étend progressivement la mise en page et les fonctionnalités pour les écrans plus grands, ce qui permet de prioriser l'expérience utilisateur sur les appareils mobiles et de simplifier la conception.

### Exemple de responsive design sur la page de visionnage des détails d'une plante
<br/>
<div style="display: flex; justify-content: center;">
<img src="/public/screenshots/plantDetails1.png" alt="présentation d'une plante en format mobile 1-2" width="250">
<img src="/public/screenshots/plantDetails2.png" alt="présentation d'une plante en format mobile 2-2" width="250">
<img src="/public/screenshots/plantDetailsTablet.png" alt="présentation d'une plante en format tablette" width="450">
<img src="/public/screenshots/plantDetailsPC.png" alt="présentation d'une activité en format ordinateur" width="800">
</div>

<br/>
<br/>

## Fonctionnalités et parcours utilisateur

**Utilisateur sans rôle spécifique:**

Un utilisateur qui n’a pas de compte pourra uniquement :
- Accéder à la page d’accueil et découvrir des exemples d’activités proposées.
- Se créer un compte

L’utilisateur qui a un compte peut :
- Se connecter, consulter son profil et modifier ses informations personnelles
- Consulter toutes les plantes disponibles à l'achat
- Consulter une page de détails d'une plante
- Mettre des plantes dans le panier
- Consulter et modifier le contenu de son panier et confirmer sa commande
- Procéder au paiement de sa commande
- Depuis son dashboard:
  - consulter son profil et modifier ses informations personnelles
  - consulter la liste de ses commandes et se rendre sur le page de détails de chaque commande passée

<br/>

**Utilisateur avec le rôle d’administrateur:**
L'administrateur peut créer, modifier, supprimer une plante


<br/>
<br/>

## Un apperçu de l'interface

### Page d'accueil
<img src="/public/screenshots/homePage.png" alt="page d'accueil" width="800">

<br/>

### Dashboard de l'utilisateur
<img src="/public/screenshots/dashboardUser.png" alt="dashboard de l'utilisateur" width="800">

<br/>

### Visionnage des plantes
<img src="/public/screenshots/allPlants.png" alt="visionnage des plantes" width="800">

<br/>

### Visualiser, modifier et valider le panier - Payer la commande
<div style="display: flex; justify-content: center;">
    <img src="/public/screenshots/basktetPage.png" alt="visualiser le panier" width="500">
    <img src="/public/screenshots/paymentPage.png" alt="payer la commande" width="500">
</div>
<br/>

### Visualier une commande passée
<img src="/public/screenshots/bookingDetailsPage.png" alt="visualiser le panier" width="800">

### Dashboard de l'administrateur
<img src="/public/screenshots/dashboardAdmin.png" alt="dahsboard administrateur" width="800">

<br/>


### Création et modification des plantes par l'administrateur
<div style="display: flex; justify-content: center;">
    <img src="/public/screenshots/createPlant.png" alt="création d'une plante par l'administrateur" width="500">
    <img src="/public/screenshots/editPlant.png" alt="modification d'une plante par l'administateur" width="500">
</div>

<br/>
<br/>

## Dossier lié 🔗
La partie backend de l'application est accessible [ici](https://github.com/marionrobert/verdure-api-back).


---
---
# Welcome to *Verdure*: Explore a Wide Range of Plants to Beautify Your Indoor Space 🌻🪴
<img src="/public/screenshots/banner.png" alt="web application banner">

Verdure is a web application for online sales of indoor plants. The application is available only in French. This repository is dedicated to the **frontend part** of this project.

<br/>
<br/>

## Development Context 💻
This is an educational project developed during the "FullStack Javascript Web Developer" training at 3w Academy.

<br/>
<br/>

## Installation and Configuration ⚙️🛠️

### System Requirements:
The application currently runs on:
- Node.js (version 16.15.1)
- Npm (version 8.11.0)

Here is the list of packages and their versions used in this project:
```javascript
"dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.4.0",
    "@fortawesome/free-brands-svg-icons": "^6.4.0",
    "@fortawesome/free-regular-svg-icons": "^6.4.0",
    "@fortawesome/free-solid-svg-icons": "^6.4.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@reduxjs/toolkit": "^1.9.5",
    "@stripe/react-stripe-js": "^2.4.0",
    "@stripe/stripe-js": "^1.54.2",
    "axios": "^1.4.0",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.1",
    "react-router-dom": "^6.14.1",
    "redux": "^4.2.1",
    "redux-thunk": "^2.4.2"
  }
```
<br />
## Installation Steps:

1. Clone the Git repository: `git clone https://github.com/marionrobert/verdure-front-react`.
2. Make sure you have the correct versions of the technological stack installed.
3. Create an **.env** file where you will put the environment variables `STRIPE_SECRET_KEY` and `STRIPE_PUBLIC_KEY` to interact with the Stripe API. You will get these keys by creating a Stripe account.
4. Run the command `npm install` to install dependencies.
5. Follow the installation and configuration steps for the backend, then start the backend API server with the command `npm run dev`. All instructions are available on the backend application repository [here](https://github.com/marionrobert/verdure-api-back).
6. Next, start the user interface server with the command `npm run dev`.

<br/>
<br/>

## File Contents 📁🗃️

The project is organized into several folders and files located in the main **src** folder (present at the root):
- **api** folder: contains files that manage HTTP requests to the application's API. For example, in the plant.jsx file, several functions are defined to interact with plant-related resources. These functions use Axios to perform HTTP requests to the API, fetching, creating, updating, or deleting plants. The functions support adding authentication tokens for secure requests and handle responses and errors returned by the API.
- **components** folder: contains files that define reusable components throughout the application. There are 3 components: PlantCard.jsx, Footer.jsx, Header.jsx
- **containers** folder: unlike reusable components in the "components" folder, components in the "containers" folder are specific to views of the application (example `Home.jsx`) or particular features (like `CheckoutForm.jsx`).
- **helpers** folder: contains the require-data-auth.jsx file that defines a React component acting as a Higher-Order Component (HOC) to control route data and security. It manages route parameter retrieval, state extraction from the Redux store, redirection handling based on user authentication, and makes API calls to verify the user token authenticity. Based on authentication status and user roles, it redirects to appropriate pages or displays the child component with transmitted parameters.
- **slices** folder: contains several files associated with managing the global state of the application using Redux, a state manager for JavaScript applications.
  - **store.jsx**: contains the configuration of the application's Redux store, which combines all defined "slices" in the application to create a single store managing the global application state.
  - **plantSlice.jsx**: defines a "slice" to manage plant-related state in the application. It includes actions, reducers, and selectors to manipulate and fetch plant-related data.
  - **basketSlice.jsx**: defines a "slice" to manage the basket state in the application, storing products or items selected by the user. It includes actions to update and clear the basket, as well as functions to calculate the total basket amount.
  - **userSlice.jsx**: defines a "slice" to manage user state in the application, storing user login information such as the user ID and authentication token. It includes actions to set the user and log them out, as well as selectors to fetch user information.
- **App.jsx** file: defines the root component of the application. It organizes routes and components of the application using React Router for navigation. It also includes application headers and footers, as well as routes for different features such as plant management, reservations, user authentication, and administrative features.
- **App.scss** file: contains CSS applicable to the entire application. It follows the "mobile first" method, meaning CSS for mobile formats is defined first, followed by adaptations for tablet and desktop formats. CSS is structured by containers and components.
- **config.js** file: contains a config object that stores necessary information for the application, such as API URLs and image URLs. Currently, it is configured to use local URLs (http://localhost:9000), but there is also a configuration commented out for use with an IDE development environment (http://marionrobert.ide.3wa.io:9000).
- **main.jsx** file: this is the entry point of the React application. It imports necessary modules like React, ReactDOM, and App, BrowserRouter, Provider, and store components. Then, it renders the application by encapsulating the App component in a Redux context provided by Provider and a router provided by BrowserRouter, all wrapped in React's strict mode.

At the root of the project, there are also:
- a **public** folder containing only the favicon image and screenshots of the web application used in this README.
- an **index.html** file defining the basic structure of the React web application page, including metadata such as title, description, links to external resources like stylesheets and scripts, and the main container where the application will be rendered.
- a **vite.config.js** file configuring Vite to support React using the @vitejs/plugin-react plugin. It exports a default configuration specifying the use of the React plugin.

<br/>
<br/>

## Responsive Design and "Mobile First" Method
Responsive design involves creating websites and applications that automatically adapt to different screen sizes and device types, providing an optimal user experience on desktop computers, tablets, and smartphones. The mobile-first method is a design approach that starts with designing for mobile devices, then gradually extends the layout and features for larger screens, prioritizing the user experience on mobile devices and simplifying design.

### Example of Responsive Design on the Plant Details Viewing Page
<br/>
<div style="display: flex; justify-content: center;">
<img src="/public/screenshots/plantDetails1.png" alt="plant presentation in mobile format 1-2" width="250">
<img src="/public/screenshots/plantDetails2.png" alt="plant presentation in mobile format 2-2" width="250">
<img src="/public/screenshots/plantDetailsTablet.png" alt="plant presentation in tablet format" width="450">
<img src="/public/screenshots/plantDetailsPC.png" alt="plant presentation in computer format" width="800">
</div>

<br/>
<br/>

## Features and User Journey

**User without specific role:**

A user without an account can only:
- Access the home page and discover examples of proposed activities.
- Create an account.

A user with an account can:
- Log in, view their profile, and modify their personal information.
- View all plants available for purchase.
- View a plant details page.
- Add plants to the cart.
- View and modify the contents of their cart and confirm their order.
- Proceed to payment for their order.
- From their dashboard:
  - view their profile and modify their personal information
  - view the list of their orders and go to the details page of each placed order.

**User with administrator role:**
The administrator can create, modify, and delete a plant.

<br/>
<br/>

## Interface Overview

### Home Page
<img src="/public/screenshots/homePage.png" alt="home page" width="800">

<br/>

### User Dashboard
<img src="/public/screenshots/dashboardUser.png" alt="user dashboard" width="800">

<br/>

### Viewing Plants
<img src="/public/screenshots/allPlants.png" alt="viewing plants" width="800">

<br/>

### Viewing, Modifying, and Validating the Cart - Paying for the Order
<div style="display: flex; justify-content: center;">
    <img src="/public/screenshots/basktetPage.png" alt="viewing the cart" width="500">
    <img src="/public/screenshots/paymentPage.png" alt="paying for the order" width="500">
</div>
<br/>

### Viewing a Placed Order
<img src="/public/screenshots/bookingDetailsPage.png" alt="viewing the cart" width="800">

### Administrator Dashboard
<img src="/public/screenshots/dashboardAdmin.png" alt="administrator dashboard" width="800">

<br/>


### Creating and Modifying Plants by the Administrator
<div style="display: flex; justify-content: center;">
    <img src="/public/screenshots/createPlant.png" alt="creating a plant by the administrator" width="500">
    <img src="/public/screenshots/editPlant.png" alt="modifying a plant by the administrator" width="500">
</div>

<br/>
<br/>

## Related Repository 🔗
The backend part of the application is accessible [here](https://github.com/marionrobert/verdure-api-back).
