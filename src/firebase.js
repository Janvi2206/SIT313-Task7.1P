import { initializeApp} from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdqT-2nLwvbfHvWN36--ZVjA1w6zxLHqs",
  authDomain: "practice-4cb39.firebaseapp.com",
  projectId: "practice-4cb39",
  storageBucket: "practice-4cb39.appspot.com",
  messagingSenderId: "552456991902",
  appId: "1:552456991902:web:cfa1cddd70546eb251778f"
};


const app = initializeApp(firebaseConfig);
const provider=new GoogleAuthProvider();

provider.setCustomParameters({
  prompt:"select_account"
});
export const auth = getAuth(app);
export const db = getFirestore(app);
export const createuserdocfromAuth = async(userAuth, additionalInformation ={}) =>
{
  if(!userAuth.email) return;

  const userDocRef=doc (db, 'users', userAuth.uid);
  console.log(userDocRef)


const userSnapShots = await getDoc(userDocRef);
console.log(userSnapShots)
console.log(userSnapShots.exists())

if(!userSnapShots.exists())
{
   const {displayName, email} =userAuth
   const createdAt = new Date();
   try{
    await setDoc(userDocRef,{
   displayName,
   email,
   createdAt,
   ...additionalInformation
    })
  }
    catch(error){
    console.log('error in creating', error.message)
    }

   }
   return userDocRef;
}

export async function createAuthUserWithEmailAndPassword (email,password)
{ 
  if(!email || !password) 
  return
  return await createUserWithEmailAndPassword(auth,email,password)
}
export async function signinAuthUserWithEmailAndPassword (email,password)
{ 
  if(!email || !password) 
  return
  return await signInWithEmailAndPassword(auth,email,password)
}

  