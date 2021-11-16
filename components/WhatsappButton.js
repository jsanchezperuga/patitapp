import React from 'react'
import { TouchableOpacity, Linking, Text, StyleSheet, Image } from 'react-native'

export default function WhatsappButton({ wpp }) {
  const openWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=+549${wpp}`)
  }

  return (
    <TouchableOpacity style={styles.button} onPress={openWhatsapp}>
      <Text style={styles.buttonText}>
        <Image source={require("../assets/whatsapp-logo.png")} style={styles.whatsappLogo} />
        Comunicarse al Whatsapp
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#25D366",
    padding: 15,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: "#20232A",
    borderRadius: 10,
    height: 50,
    marginTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: '700',
    minHeight: 50,
  },
  whatsappLogo: {
    width: 30,
    height: 30,
  }
})