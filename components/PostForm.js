import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import addPicture from '../assets/add-picture-icon.png';

export default function PostForm({ formTitle, titlePlaceHolder, contactPlaceHolder, areaPlaceHolder,channelPlaceHolder }) {
  //form field's states
  const [title, setTitle] = useState('');
  const [contact, setContact] = useState('');
  const [area, setArea] = useState('');
  const [descr, setdescr] = useState('');
  const [channel, setChannel] = useState('');
  const [pic, setPic] = useState('');

  // const saveForm = () => {
  //   //validacion?aFirebase:mostrarErrores (toast)
  // }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {formTitle}
      </Text>
      <Text style={styles.formItemTitle}>
        Título
      </Text>
      <TextInput style={styles.input}
        placeholder={titlePlaceHolder}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Text
        style={styles.formItemTitle}>
        Contacto
      </Text>
      <TextInput style={styles.input}
        placeholder={contactPlaceHolder}
        value={contact}
        onChangeText={text => setContact(text)}
      />
      <Text
        style={styles.formItemTitle}>
        Zona
      </Text>
      <TextInput style={styles.input}
        placeholder={areaPlaceHolder}
        value={area}
        onChangeText={text => setArea(text)}
      />
      <Text
        style={styles.formItemTitle}>
        Descripción
      </Text>
      <TextInput
        style={styles.inputMultiline}
        multiline={true}
        placeholder={'Ingresa raza, color, tamaño y cualquier información que ayude a la identificación'}
        value={descr}
        onChangeText={text => setdescr(text)}
      />
      <Text
        style={styles.formItemTitle}>
        Whatsapp
      </Text>
      <TextInput style={styles.input}
        placeholder={channelPlaceHolder}
        value={channel}
        onChangeText={text => setChannel(text)}
      />
      <Text
        style={styles.formItemTitle}>
        Agregar una foto
      </Text>
      <View style={styles.imageContainer}>
        <Image source={addPicture} style={styles.singleImage} />
      </View>

      <Button title="Publicar" />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  }, formItemTitle: {
    margin: 5,
    fontSize: 14,
    fontWeight: '700'
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
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  imageContainer: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleImage: {
    margin: 20,
    width: 60,
    height: 60
  }
})
