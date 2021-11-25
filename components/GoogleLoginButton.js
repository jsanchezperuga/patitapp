import React, { useEffect, useContext } from 'react'
import * as Google from 'expo-auth-session/providers/google';
import Toast from 'react-native-toast-message';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { GoogleAuthProvider, signInWithCredential } from "@firebase/auth"
import { DataContext } from '../contexts/GlobalContext';
import { auth } from '../services/Firebase';
import env from "../env.json";

export default function GoogleLoginButton({ navigation }) {
  const { setUser } = useContext(DataContext)
  const [request, response, promptAsync] = Google.useAuthRequest(env.googleAuth);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      signInWithCredential(auth, GoogleAuthProvider.credential(null, authentication.accessToken))
        .then(googledUser => {
          setUser(googledUser);
          Toast.show({ type: "success", text1: `Bienvenido ${googledUser.user.providerData[0].displayName} 👋👋` })
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
        <Image source={require("../assets/google-logo.png")} style={styles.googleLogo} />
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