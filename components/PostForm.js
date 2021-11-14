import React , { useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity,Image,ScrollView} from 'react-native'
;
import addPicture from '../assets/add-picture-icon.png';
import { Card } from 'react-native-paper';


export default function PostForm() {
  return (<ScrollView style={styles.container}>
   <Card>
    <Text style={styles.paragraph}>
      Crear aviso de mascota perdida
    </Text>
    
    <Text 
    style={styles.formItemTitle}>
    Título
    </Text>
    <TextInput style={styles.input} 
      placeholder="Ej: Buscamos a Porota"
    />

    <Text 
      style={styles.formItemTitle}>
      Contacto
    </Text>
    <TextInput style={styles.input} 
      placeholder="Nombre del contacto"
    />

    <Text 
      style={styles.formItemTitle}>
    Zona
    </Text>
    <TextInput style={styles.input} 
      placeholder="Barrio en donde se perdió"
    />

    <Text 
    style={styles.formItemTitle}>
    Descripción
    </Text>        
    <TextInput
      style={styles.inputMultiline}
      // onChangeText={onChangeNumber}
      // value={number}
      multiline={true}
      placeholder="Nombre, raza, tamaño y otras características que ayuden a identificar a tu mascota."
      keyboardType="numeric"
    />
    <Text 
      style={styles.formItemTitle}>
    Whatsapp
    </Text>
    <TextInput style={styles.input} 
      placeholder="Número de celular del contacto"
    />
     <Text 
      style={styles.formItemTitle}>
    Agregar una foto      
    </Text>
    <View style = {styles.imageContainer}>
      <Image source={addPicture} style={styles.singleImage} /> 
    </View>
    
    
    </Card>
    <Button title="Publicar" />
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },formItemTitle:{
    margin:5,
    fontSize: 14,
    fontWeight:'700'
  },
  input: {
    height: 40, 
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
    inputMultiline: {
    height: 100,
    margin: 5 ,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,    
    textAlignVertical:'top',
  },
  imageContainer:{
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleImage:{
    margin: 20,
    width: 60,
    height: 60
  }
});