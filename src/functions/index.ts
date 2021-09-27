import { firebaseConfig } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { HackIdea } from "../interfaces/documentData";
import { FieldSortOrder } from "../constant";

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getData(field: string, order: FieldSortOrder) {
  const collectionRef = collection(db, "ideas");
  const result = query(collectionRef, orderBy(field, order));
  const querySnapshot = await getDocs(result);
  const ideaList = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return ideaList;
}

export async function saveData(data: HackIdea) {
  const collectionRef = collection(db, "ideas");
  const docRef = await addDoc(collectionRef, data);
  return true;
}

export async function updateData(data: HackIdea) {
  const collectionRef = collection(db, "ideas");
  // collectionRef.
  // const docById = await getDoc()
  // const docRef = await updateDoc(collectionRef, )
}
