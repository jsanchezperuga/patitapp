import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Platform, Image } from 'react-native'
import { auth } from '../services/Firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth"
import { DataContext } from '../contexts/GlobalContext'
import { validateEmail, validatePassword } from '../utils/validations'

export default function Authentication({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(DataContext)

  const loginWithGoogle = () => {

  }

  const traditionalLogin = () => {
    // un login tiene menos validaciones que un registro
    let emailValidation = email.length > 5 && email.includes("@") && email.includes(".");
    let passwordValidation = password.length > 5

    if (emailValidation && passwordValidation) {
      signInWithEmailAndPassword(auth, email, password)
        .then(loggedUser => {
          console.log("iniciando sesion...");
          setUser(loggedUser)
          navigation.navigate('AppNavigator')
        })
        .catch(err => {
          console.log(err.code);
          if (err.code === "auth/user-not-found") {
            console.log("el mail o la contraseña no pertenecen a un usuario registrado");
          } else if (err.code === "auth/wrong-password") {
            console.log("el mail y/o la contraseña no son correctos, verifique e intente nuevamente");
          }
        })
    } else {
      emailValidation ? console.log("El email no tiene un formato valido") : "";
      passwordValidation ? console.log("La contraseña ingresada es muy corta") : "";
    }
  }

  const registerUser = () => {
    let [emailError, emailMessageError] = validateEmail(email);
    let [passwordError, passwordMessageError] = validatePassword(password);
    if (!emailError && !passwordError) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(registerUser => {
          console.log("Usuario creado correctamente");
          setUser(registerUser);
          navigation.navigate('AppNavigator');
        })
        .catch(err => {
          console.log(err.code);
          if (err.code === "auth/email-already-in-use") {
            console.log("Ya existe un usuario registrado con este email");
          }
        })
    } else {
      emailError ? console.log(emailMessageError) : "";
      passwordError ? console.log(passwordMessageError) : "";
    }
  }



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform && Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email 📩"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña 👀"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={traditionalLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={registerUser}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrarse</Text>
        </TouchableOpacity>
        <Text>O tambien puede</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={loginWithGoogle}
          style={[styles.button, { padding: 0, borderRadius: 0 }]}>
          <Image source={require("../assets/loginWithGoogle.png")} style={styles.googleButton} />
        </TouchableOpacity>
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