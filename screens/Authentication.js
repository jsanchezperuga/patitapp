import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'
import * as Location from 'expo-location';
import { traditionalLogin, registerUser, continueAuth } from '../utils/authProcess'
import { DataContext } from '../contexts/GlobalContext'
import GoogleLoginButton from '../components/GoogleLoginButton'
import env from "../env.json"

export default function Authentication({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser, setLocation } = useContext(DataContext)

  const login = () => {
    let loggedUser = traditionalLogin(email, password);
    loggedUser ? continueAuth(setUser, navigation) : null;
  }

  const register = async () => {
    let registeredUser = registerUser(email, password);
    registeredUser ? continueAuth(setUser, navigation) : null;
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation(env.defaultGeolocation);
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({ accuracy: 4 });
      let { latitude, longitude } = coords;
      setLocation({ latitude, longitude });
    })();
  }, [])

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
          onPress={login}
          style={styles.button} >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={register}
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