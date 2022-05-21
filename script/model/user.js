const multer = require('multer')({
  dest: 'public/files'
})
const fs = require('fs')
const path = require('path')
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } = require("firebase/auth");
const { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc } = require("firebase/firestore");
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const jwt = require('jsonwebtoken');
const provider = new GoogleAuthProvider();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOOTVQ_mpOWBCBguUl-b_THhnIx9QjeNk",
  authDomain: "redsocial-a81b0.firebaseapp.com",
  projectId: "redsocial-a81b0",
  storageBucket: "redsocial-a81b0.appspot.com",
  messagingSenderId: "44277360382",
  appId: "1:44277360382:web:8be1a86682b8e4094967af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);

const loginWithEmail = async function (user) {
  let response;
  await signInWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userCredential) => {
      // Signed in
      const userDB = userCredential.user;
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const token = await jwt.sign(
          { user_id: userDB.uid, email: userDB.email },
          'estoessecreto',

          {
            expiresIn: "2h",
          }
        );
        console.log(token);
        const user = {
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
          email: docSnap.data().email,
          uid: docSnap.data().uid,
          token: token
        };

        response = user;
      } else {
        console.log("No conseguimos datos del usuario");
      }

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
        response = "email or password invalid";

      }
    });
  return response;
}

const saveUser = async (user) => {
  await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userCredential) => {
      // Signed in
      const userDB = userCredential.user;
      const usersRef = collection(db, "users");
      await setDoc(doc(usersRef, user.email), {
        uid: userDB.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email

      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

//Recuperar password con firebase
const recovery = async (email) => {
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

const loginGoogle = async () => {
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

const logout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};

//subir imagenes

const publish = async (req) => {
  console.log(req.file)
  const user = JSON.parse(req.cookies['user_info']);
  const uid = user['uid'];
  const title = req.body.title;
  let img = req.file;
  let file;
  let { filepath } = storeWithOriginalName(req.file)
  const storageRef = ref(storage, img.filename);
  const publishRef = collection(db, 'publications');
  let imgURL;
  await uploadBytes(storageRef, img).then( (snapshot) => {
    console.log('Uploaded a blob or file!');
    imgURL =  getDownloadURL(storageRef);
  });
  await setDoc(doc(publishRef, uid), {
    uid: uid,
    img: imgURL,
    title: title,
    likes: 0,
    comments: 0,
    date: Date.now()
  });
}
function storeWithOriginalName (file) {
    var fullNewPath = path.join(file.destination, file.originalname)
    fs.renameSync(file.path, fullNewPath)
  
    return {
      filepath: fullNewPath
    }
  }

module.exports = { loginWithEmail, loginGoogle, saveUser, recovery, logout, publish };