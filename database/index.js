import { collection as useCollection, addDoc } from "firebase/firestore";
import { db } from "../services/Firebase";

export async function createPost(collection, data) {
  let result = null;
  try {
    const docRef = await addDoc(useCollection(db, collection), data);
    result = docRef.id;
    console.log("aca es:", result);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return result;
}