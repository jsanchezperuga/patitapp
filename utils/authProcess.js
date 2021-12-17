import Toast from 'react-native-toast-message';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { validateEmail, validatePassword } from '../utils/validations'
import { auth } from '../services/Firebase'
import Database from '../database'

export async function traditionalLogin(email, password) {
  let loggedUser = null;
  let emailValidation = email.length > 5 && email.includes("@") && email.includes(".");
  let passwordValidation = password.length > 5

  if (emailValidation && passwordValidation) {
    try {
      let loggedUser = await signInWithEmailAndPassword(auth, email, password)
      setUser(loggedUser)
      navigation.navigate('AppNavigator')
      Toast.show({ type: "success", text1: `Bienvenido ${loggedUser.user.providerData[0].displayName} 👋👋` })

    } catch (err) {
      console.log("error desconocido al querer iniciar:", err.code);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        Toast.show({ type: "error", text1: "El mail y/o la contraseña no son correctos" })
      }
    }
  } else {
    !passwordValidation ? Toast.show({ type: "error", text1: "La contraseña ingresada es muy corta" }) : "";
    !emailValidation ? Toast.show({ type: "error", text1: "El email no tiene un formato valido" }) : "";
  }
  return loggedUser;
}

export async function registerUser(email, password) {
  let registeredUser = null;
  let [emailError, emailMessageError] = validateEmail(email);
  let [passwordError, passwordMessageError] = validatePassword(password);
  if (!emailError && !passwordError) {
    try {
      let registerUser = await createUserWithEmailAndPassword(auth, email, password);
      if ("providerData" in registerUser.user && registerUser.user.providerData[0].displayName === null) {
        await Database.changeDisplayName();
      }
    } catch (err) {
      console.log("error desconocido al querer registrar:", err.code);
      if (err.code === "auth/email-already-in-use") {
        Toast.show({ type: "error", text1: "Ya existe un usuario registrado con este email" })
      }
    }
  } else {
    emailError ? Toast.show({ type: "error", text1: emailMessageError }) : "";
    passwordError ? Toast.show({ type: "error", text1: passwordMessageError }) : "";
  }
  return registeredUser;
}

export function continueAuth(setUser, navigation) {
  setUser(registerUser);
  navigation.navigate('AppNavigator');
}