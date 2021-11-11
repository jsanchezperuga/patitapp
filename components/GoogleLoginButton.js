import React, { useEffect, useContext } from 'react'
import * as Google from 'expo-auth-session/providers/google';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DataContext } from '../contexts/GlobalContext';
import { GoogleAuthProvider, signInWithCredential } from "@firebase/auth"
import { auth } from '../services/Firebase';


export default function GoogleLoginButton({ navigation }) {
  const { setUser } = useContext(DataContext)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '203158461668-v156na9japv7skbqgrd3mm5j50urpv27.apps.googleusercontent.com',
    webClientId: '203158461668-v156na9japv7skbqgrd3mm5j50urpv27.apps.googleusercontent.com',
    // iosClientId: 'configurar_en_caso_de_deploy',
    // androidClientId: 'configurar_en_caso_de_deploy'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      signInWithCredential(auth, GoogleAuthProvider.credential(null, authentication.accessToken))
        .then(googledUser => {
          setUser(googledUser);
          navigation.navigate("AppNavigator");
        })
        .catch(err => console.log("error while trying to login with google:", err))
    }
  }, [response])

  return (
    <TouchableOpacity
      disabled={!request}
      style={styles.button}
      onPress={() => promptAsync()}>
      <Text style={styles.buttonText}>
        <Image source={{ uri: "https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" }} style={styles.googleLogo} />
        Iniciar sesión con Google
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    paddingTop: 0,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 10,
    height: 50
  },
  buttonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: '700',
    minHeight: 50
  },
  googleLogo: {
    width: 30,
    height: 30
  }
})