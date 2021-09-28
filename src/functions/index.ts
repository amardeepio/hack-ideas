import { firebaseConfig } from "../firebaseConfig";
import firebase from "firebase/compat/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import { HackIdea } from "../interfaces/documentData";
import { FieldSortOrder } from "../constant";

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection of Firebase functions

/**
 * 
 * @param field string: Collection field to sort the data
 * @param order FieldSortOrder: Order for sorting
 * @returns array of docs for ideas collection
 */
export async function getData(field: string, order: FieldSortOrder) {
  const collectionRef = collection(db, "ideas");
  const result = query(collectionRef, orderBy(field, order));
  const querySnapshot = await getDocs(result);
  const ideaList = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return ideaList;
}

/**
 * 
 * @param data HackIdea: Data to be stored in the collection for ideas
 */
export async function saveData(data: HackIdea) {
  const collectionRef = collection(db, "ideas");
  await addDoc(collectionRef, data);
}

/**
 * 
 * @param id string: Document Id to identify the document inside the collection
 * @param data HackIdea: Updated data for the `id`
 */
export async function updateData(id: string, data: HackIdea) {
  const collectionRef = doc(db, "ideas", id);
  await setDoc(collectionRef, { ...data }, { merge: true });
}
