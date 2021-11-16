import React from 'react'
import { ScrollView, Text, StyleSheet, Image, StatusBar } from 'react-native'
import WhatsappButton from './WhatsappButton'

export default function PostInfo({ id, title, image, contactName, desc, zone, wpp, setVisible }) {
 //usar el el id
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title} onPress={() => setVisible(false)}>X</Text> */}
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <Text style={styles.row}>Contacto: {contactName}</Text>
      <Text style={styles.row}>Zona: {zone}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <WhatsappButton wpp={wpp} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    // backgroundColor: '#a9a9a9',
    padding: 8
  },
  row: {
    padding: 4,
    borderBottomColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: 'white',
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto'

  },
  desc: {
    fontSize: 17,
    justifyContent: "center",
    color: '#ffffff',
    padding: 16,

  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    padding: 15,
    color: '#ffffff',
  },
  image: {
    justifyContent: "center",
    height: 400, width: 340,
    paddingTop: 0,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 10,
  },
});