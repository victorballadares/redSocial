// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const  { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const jwt = require('jsonwebtoken');
const provider = new GoogleAuthProvider();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Aqui tu Api",
  authDomain: "redsocial-a81b0.firebaseapp.com",
  projectId: "redsocial-a81b0",
  storageBucket: "redsocial-a81b0.appspot.com",
  messagingSenderId: "44277360382",
  appId: "1:44277360382:web:8be1a86682b8e4094967af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginWithEmail = async function(user){
  let response;
  await signInWithEmailAndPassword(auth, user.email, user.password)
  .then(async (userCredential) => {
    // Signed in
    const user = userCredential.user;
    const token = jwt.sign(
      { user_id: user.uid, email:user.email },
      'estoessecreto',
      
      {
        expiresIn: "2h",
      }
    );
    response = token;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode == "auth/user-not-found"){
       response = "email or password invalid";

    }
  });
  return response;
}

const saveUser = async (user) =>{
  await createUserWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

//Recuperar password con firebase
const recovery = async (email) =>{
await sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}

const loginGoogle = async () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


module.exports = {loginWithEmail,loginGoogle,saveUser,recovery};