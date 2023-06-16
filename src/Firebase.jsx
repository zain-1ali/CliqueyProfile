import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, set, ref, update, push, onValue, } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAHaQfMFSfa49hBu1SF2IrhU_heNqzT1Qo",
    authDomain: "cliquey-187b6.firebaseapp.com",
    databaseURL: "https://cliquey-187b6-default-rtdb.firebaseio.com",
    projectId: "cliquey-187b6",
    storageBucket: "cliquey-187b6.appspot.com",
    messagingSenderId: "1023624790484",
    appId: "1:1023624790484:web:c4a872ac8084003f271641",
    measurementId: "G-2SGPV3VHK3"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const db=getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app);
