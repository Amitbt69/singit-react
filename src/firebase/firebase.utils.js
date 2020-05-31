import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAp8jsCx9mc22jscHZE71N9EUyW7_Nf-5g",
    authDomain: "singit-react.firebaseapp.com",
    databaseURL: "https://singit-react.firebaseio.com",
    projectId: "singit-react",
    storageBucket: "singit-react.appspot.com",
    messagingSenderId: "247345128102",
    appId: "1:247345128102:web:097fa1cb28cef77f324a67",
    measurementId: "G-6D8ZDFKND9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creatig user', error.message);
        }
    }
    return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;