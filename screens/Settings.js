import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { signOut } from '@firebase/auth'
import { auth } from '../services/Firebase'
import { DataContext } from '../contexts/GlobalContext'

export default function Settings({ navigation }) {
  const { setUser } = useContext(DataContext)
  const logout = () => {
    setUser({});
    signOut(auth);
    navigation.navigate('Authentication');
  }

  return (
    <View style={styles.container}>
      <Text>Hola soy el SettingsScreen</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.loggOutButton}
          onPress={logout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: "60%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggOutButton: {
    width: '100%',
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: '700',
    fontSize: 16
  }
});