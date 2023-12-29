
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore, collection, addDoc, query, where, getDocs, getDoc, doc , updateDoc} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgx43mPL8U4CYJNMiREg-OkUFErbVSclQ",
  authDomain: "urlshortner-2e06f.firebaseapp.com",
  projectId: "urlshortner-2e06f",
  storageBucket: "urlshortner-2e06f.appspot.com",
  messagingSenderId: "907496100296",
  appId: "1:907496100296:web:4071b95dd4d58670a530fd",
  databaseURL: "https://urlshortner-2e06f-default-rtdb.firebaseio.com/",
};


export const app = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export const useFirebase = () => useContext(FirebaseContext);
const auth = getAuth(app);

export const ContextProvider = (props) => {
    const putData = async (originalUrl) => {
        const docRef = await addDoc(collection(db, "urls"), {
            originalUrl,
          });
          console.log("Document written with ID: ", docRef.id);
          const cityRef = doc(db, 'urls', docRef.id);
          await updateDoc(cityRef, {
            shortUrl: docRef.id
        });
        
    }

    const getUrl = async (id) => {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    }
    const fetchAllUrl = async () => {
        const q = (collection(db, "urls"))

        const querySnapshot = await getDocs(q);
        return querySnapshot;
    }
    const loginSignupWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            // alert("Login Successful")
            // navigate('/')
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            // alert(errorMessage);
        });
    }
    return( 
        
        <FirebaseContext.Provider value={{loginSignupWithGoogle, fetchAllUrl, putData, getUrl}}>
        {props.children}
        </FirebaseContext.Provider>
    )
}