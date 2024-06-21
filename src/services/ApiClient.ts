import axios from "axios";


// let token = "";

// export const getAccessToken = () => {
//   return token;
// }

//Timer utility function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// //---------------------------------------------------------------------------
// /**
//  * Instance Axios de base
//  */
// const rateLimit = 1000; // 1 request per second
// let requestInProgress = false;

// export const instance = axios.create({
//   baseURL: 'http://localhost:8080/', //192.168.68.103
//   headers: {
//     'Content-Type': 'application/json'
//     }
// });

// export const removeAccessToken = () => {
//   instance.defaults.headers.common['Authorization'] = "";
// }

// export const refreshAccessToken = async () => {
//   // Appel afin de récupèrer un nouveau access token
//   const newToken = await retrieveAccesToken();

//   // Mise à jour de l'instance d'axios avec le nouveau access token
//   instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

//   return newToken;
// };

// // Intercepteur de requêtes
// instance.interceptors.request.use(
//   async (config) => {
//     if (requestInProgress) {
//       // Attendre que la requête en cours soit terminée
//       await delay(rateLimit);
//     }
//     requestInProgress = true;
//     return config;
//   },
//   (error) => {
//     // Retourne l'erreur
//     return Promise.reject(error);
//   }
// );

// // Intercepteur de réponses
// instance.interceptors.response.use(
//   (response) => {
//     // Réinitialiser la variable requestInProgress
//     requestInProgress = false;
//     // Retourne une réponse avec succès
//     return response;
//   },
//   async (error) => {
//     // Réinitialiser la variable requestInProgress
//     requestInProgress = false;

//     //Si l'erreur est due à l'expiration du access token (err 401)
//     if (error.response && error.response.status === 401) {
//       //Refresh accessToken
//       token = await refreshAccessToken();

//       //Réessaye la requête avec le nouveau access token
//       error.config.headers['Authorization'] = `Bearer ${token}`;
//       return instance.request(error.config);
//     }

//     // Autrement on retourne l'erreur
//     return Promise.reject(error);
//   }
// );



//---------------------------------------------------------------------------
/**
 * Instance Axios Backend Combinaisons et Meshy (Génération de mesh)
 */
export const backendInstance = axios.create({
  baseURL: 'https://infinitecraft3dserver-production.up.railway.app/api',//'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
    //'Authorization': 'Bearer msy_DIMG5PB47ejZ8NfvOlkTFtSq84lZTgqmGZlH'
  }
});


//---------------------------------------------------------------------------
/**
 * Instance Axios de récupération de l'adresse IP
 */
export const ipGrabberInstance = axios.create({
  baseURL: 'https://api.ipify.org',
  headers: {
    'Content-Type': 'application/json'
    }
});