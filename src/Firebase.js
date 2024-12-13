import { initializeApp } from "firebase/app";

 const firebaseConfig = {
    apiKey: "AIzaSyCFcB6YkWUGMi5vk0OeSf0K1ScYYPkNb2g",
    authDomain: "tappze-29e47.firebaseapp.com",
    databaseURL: "https://tappze-29e47-default-rtdb.firebaseio.com",
    projectId: "tappze-29e47",
    storageBucket: "tappze-29e47.appspot.com",
    messagingSenderId: "63914519354",
    appId: "1:63914519354:web:a06785ca25d35cad70be03",
    measurementId: "G-TES9PRNT03"
};

  const app = initializeApp(firebaseConfig);

  export default app;