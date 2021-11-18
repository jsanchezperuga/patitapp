import React, { useState, useContext } from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth"
import { auth } from '../services/Firebase'
import { DataContext } from '../contexts/GlobalContext'
import { validateEmail, validatePassword } from '../utils/validations'
import { comprobateDisplayName } from '../database'
import Toast from 'react-native-toast-message';
import GoogleLoginButton from '../components/GoogleLoginButton'

export default function Authentication({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(DataContext)

  const traditionalLogin = () => {
    // un login tiene menos validaciones que un registro
    let emailValidation = email.length > 5 && email.includes("@") && email.includes(".");
    let passwordValidation = password.length > 5

    if (emailValidation && passwordValidation) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async loggedUser => {
          setUser(loggedUser)
          navigation.navigate('AppNavigator')
          Toast.show({ type: "success", text1: `Bienvenido ${loggedUser.user.providerData[0].displayName} 👋👋` })
        })
        .catch(err => {
          console.log("error al querer iniciar:", err.code);
          if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
            Toast.show({ type: "error", text1: "El mail y/o la contraseña no son correctos" })
          }
        })
    } else {
      !passwordValidation ? Toast.show({ type: "error", text1: "La contraseña ingresada es muy corta" }) : "";
      !emailValidation ? Toast.show({ type: "error", text1: "El email no tiene un formato valido" }) : "";
    }
  }

  const registerUser = async () => {
    let [emailError, emailMessageError] = validateEmail(email);
    let [passwordError, passwordMessageError] = validatePassword(password);
    if (!emailError && !passwordError) {
      try {
        let registerUser = await createUserWithEmailAndPassword(auth, email, password);
        await comprobateDisplayName(registerUser);
        setUser(registerUser);
        navigation.navigate('AppNavigator');
      } catch (err) {
        console.log("error al querer registrar:", err.code);
        if (err.code === "auth/email-already-in-use") {
          Toast.show({ type: "error", text1: "Ya existe un usuario registrado con este email" })
        }
      }
    } else {
      emailError ? Toast.show({ type: "error", text1: emailMessageError }) : "";
      passwordError ? Toast.show({ type: "error", text1: passwordMessageError }) : "";
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform && Platform.OS === "ios" ? "padding" : null} >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email 📩"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          keyboardType="email-address" />
        <TextInput
          placeholder="Contraseña 👀"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={traditionalLogin}
          style={styles.button} >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={registerUser}
          style={[styles.button, styles.buttonOutline]} >
          <Text style={styles.buttonOutlineText}>Registrarse</Text>
        </TouchableOpacity>
        <Text>O tambien puede</Text>
        <GoogleLoginButton navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  googleButton: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
  }
})