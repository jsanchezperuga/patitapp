import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { ScrollView, Text, StyleSheet, Image } from 'react-native'
import WhatsappButton from './WhatsappButton'

export default function PostInfo() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lola te está buscando</Text>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Golden_Retriever_9-year_old.jpg/1200px-Golden_Retriever_9-year_old.jpg' }}
        style={styles.image}
      />
      <Text style={styles.row}>Contacto: Ana</Text>
      <Text style={styles.row}>Zona: Devoto</Text>
      <Text style={styles.desc}>Golden Retriever perdida, tiene 5 años y tenia un collar verde, se escapo por la placita Libertad el martes 2 de noviembre. Cualquier info contactarse al whatsapp
      Golden Retriever perdida, tiene 5 años y tenia un collar verde, se escapo por la placita Libertad el martes 2 de noviembre. Cualquier info contactarse al whatsapp
      Golden Retriever perdida, tiene 5 años y tenia un collar verde, se escapo por la placita Libertad el martes 2 de noviembre. Cualquier info contactarse al whatsapp
      Golden Retriever perdida, tiene 5 años y tenia un collar verde, se escapo por la placita Libertad el martes 2 de noviembre. Cualquier info contactarse al whatsapp</Text>
      <WhatsappButton />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#a9a9a9",
    padding: 16,
    marginBottom: 24,
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