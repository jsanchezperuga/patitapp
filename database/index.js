import { collection as useCollection, addDoc } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { auth } from "../services/Firebase";
import { db } from "../services/Firebase";
import { fire } from "react-native-alertbox";

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

export async function comprobateDisplayName({ user }) {
  if ("providerData" in user && user.providerData[0].displayName === null) {
    return new Promise((res) => {
      const config = {
        title: 'Como te llamás? 🤔', message: 'Este es el nombre que se mostrara en tus publicacioes (OJO! este no podra cambiarse)',
        actions: [{
          text: 'Continuar',
          onPress: async ({ name }) => {
            await updateProfile(auth.currentUser, { displayName: name })
          }
        }],
        fields: [{ name: 'name', placeholder: 'Ingrese tu nombre y apellido', }]
      }
      res(fire(config));
    })
  }
}