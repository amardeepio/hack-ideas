import { firebaseConfig } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getData() {
  const ideaCollection = collection(db, "ideas");
  const collectionSnapshot = await getDocs(ideaCollection);
  const ideaList = collectionSnapshot.docs.map((doc) => doc.data());
  return ideaList;
}
