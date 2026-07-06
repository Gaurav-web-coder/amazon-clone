import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration (Placeholders for now)
const firebaseConfig = {
    apiKey: "AIzaSyCEthWfGMYsLVqKc3aoynuyduD0qIfepsI",
    authDomain: "clone-dac75.firebaseapp.com",
    projectId: "clone-dac75",
    storageBucket: "clone-dac75.firebasestorage.app",
    messagingSenderId: "784600443198",
    appId: "1:784600443198:web:9166cd245d4f8c7b40a46f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // 2. Initialize the database

export { auth, db }; // 3. Export db so other files can use it