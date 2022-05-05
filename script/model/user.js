// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const  { getAuth, sendSignInLinkToEmail } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Aquí introduce tu api key",
  authDomain: "redsocial-a81b0.firebaseapp.com",
  projectId: "redsocial-a81b0",
  storageBucket: "redsocial-a81b0.appspot.com",
  messagingSenderId: "44277360382",
  appId: "1:44277360382:web:8be1a86682b8e4094967af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginWithEmail = function(user){
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}


module.exports = {loginWithEmail};