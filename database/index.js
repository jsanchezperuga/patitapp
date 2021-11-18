import { auth, db, storage, ref } from "../services/Firebase";
import { collection as useCollection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { updateProfile } from "@firebase/auth";
import { fire } from "react-native-alertbox";

export async function getPosts(collection) {
  const q = query(useCollection(db, collection), orderBy("timestamp", "desc"), limit(6))
  let posts = [];
  let snapshot = await getDocs(q);
  snapshot.docs.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));

  return posts;
}

export async function createPost(collection, user, imageUri, data) {
  const timestamp = Date.now();
  const imgName = `${timestamp}-${user.user.email}.jpg`;

  let result = null;
  const imgURL = imageUri ? await uploadImage(imgName, imageUri) : await getDownloadURL(ref(storage, "perro-perdido.jpg"))
  try {
    data.image = imgURL;
    data.timestamp = timestamp;
    const docRef = await addDoc(useCollection(db, collection), data);
    result = docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return result;
}

export async function changeDisplayName() {
  const config = {
    title: 'Como te llamás? 🤔', message: 'Este es el nombre que se mostrara en tus publicacioes (OJO! este no podra cambiarse)',
    actions: [{
      text: 'Continuar',
      onPress: async ({ name }) => {
        await updateProfile(auth.currentUser, { displayName: name, photoURL: "default" })
      }
    }],
    fields: [{ name: 'name', placeholder: 'Ingrese tu nombre y apellido', }]
  }
  fire(config);
}

async function uploadImage(directory, imageUri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", imageUri, true);
    xhr.send(null);
  });

  await uploadBytes(ref(storage, directory), blob, { contentType: "image/jpg" })
  let downloadURL = await getDownloadURL(ref(storage, directory));
  return downloadURL;
}

export default {
  getPosts,
  createPost,
  changeDisplayName
}