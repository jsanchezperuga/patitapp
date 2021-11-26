import React from 'react'
import { ScrollView, Text, StyleSheet, Image, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import WhatsappButton from './WhatsappButton'

export default function PostInfo({ id, title, image, contactName, desc, zone, wpp, setVisible }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text onPress={() => setVisible(false)}>
        <AntDesign name="down" size={24} color="black" />
      </Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.row}>Contacto: {contactName}</Text>
        <Text style={styles.row}>Zona: {zone}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <WhatsappButton wpp={wpp} style={styles.wapButton} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    padding: 4,
    borderBottomColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 0,
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#000039',
    fontSize: 17,

  },
  desc: {
    fontSize: 17,
    justifyContent: "center",
    color: '#000039',
    padding: 16,

  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    padding: 15,
    color: '#000039',
  },
  image: {
    height: 300,
    width: 300,
    paddingTop: 5,
    borderWidth: 2,
    borderColor: "#ffffff",
    resizeMode: 'stretch'
  },
  wapButton: {
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  imageContainer: {
  },
  infoContainer: {
    padding: 15,
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    justifyContent: 'flex-start',
    width: '100%'
  }
});