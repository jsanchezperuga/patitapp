import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet, TextInput, Button, ScrollView, View, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PostForm({ formTitle, titlePlaceHolder, areaPlaceHolder }) {
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [area, setArea] = useState("");
  const [descr, setdescr] = useState("");
  const [channel, setChannel] = useState("");
  const [pic, setPic] = useState(null);

  // const saveForm = () => {
  //   //validacion?aFirebase:mostrarErrores (toast)
  // }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert("Perdon, necesitamos los permisos de la galeria para continuar.");
        }
      }
    })();
  }, []);

  const readImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    })
    console.log(result);
    if (!result.cancelled) {
      setPic(result.uri);
    }
  }

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
        onChangeText={text => setTitle(text)} />
      <Text
        style={styles.formItemTitle}>
        Contacto
      </Text>
      <TextInput style={styles.input}
        placeholder="Nombre del contacto"
        value={contact}
        onChangeText={text => setContact(text)} />
      <Text
        style={styles.formItemTitle}>
        Zona
      </Text>
      <TextInput style={styles.input}
        placeholder={areaPlaceHolder}
        value={area}
        onChangeText={text => setArea(text)} />
      <Text
        style={styles.formItemTitle}>
        Descripción
      </Text>
      <TextInput style={styles.inputMultiline}
        multiline={true}
        placeholder="Ingresa raza, color, tamaño y cualquier información que ayude a la identificación"
        value={descr}
        onChangeText={text => setdescr(text)} />
      <Text
        style={styles.formItemTitle}>
        Whatsapp
      </Text>
      <TextInput style={styles.input}
        placeholder="Sin +54 9 y con 11. Ej: 1122334455"
        keyboardType="phone-pad"
        value={channel}
        onChangeText={text => setChannel(text)} />
      <Text
        style={styles.formItemTitle}>
        Agregar una foto
      </Text>
      <TouchableHighlight style={styles.imageContainer} onPress={readImage}>
        <View>
          {pic
            ? <Image source={{ uri: pic }} style={styles.singleImage} />
            : <Image source={require("../assets/add-picture-icon.png")} style={styles.singleImage} />}
        </View>
      </TouchableHighlight>
      <Button title="Publicar" />
    </ScrollView>
  )
}

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
