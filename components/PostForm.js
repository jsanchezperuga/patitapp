import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, StyleSheet, TextInput, Button, ScrollView, View, TouchableOpacity } from 'react-native';
import { validatePostContactName, validatePostContactNumber, validatePostTitle, validatePostArea } from '../utils/validations';
import { AntDesign } from '@expo/vector-icons';
import Database from '../database';
import { DataContext } from '../contexts/GlobalContext';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';

export default function PostForm({ formTitle, titlePlaceHolder, areaPlaceHolder, collection, setVisible }) {
  const { user } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [contactName, setContactName] = useState(user.user.providerData[0].displayName);
  const [area, setArea] = useState("");
  const [desc, setDesc] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pic, setPic] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  const saveForm = async () => {
    setIsDisable(true);
    let [cNameError, cNameMessageError] = validatePostContactName(contactName);
    let [cNumberError, cNumberMessageError] = validatePostContactNumber(contactNumber);
    let [titleError, titleMessageError] = validatePostTitle(title);
    let [areaError, areaMessageError] = validatePostArea(area)
    if (cNameError || cNumberError || titleError || areaError) {
      let messageError = ""
      // solo se puede mostrar un toast
      cNumberError ? messageError = `• ${cNumberMessageError}` : ""
      areaError ? messageError = `• ${areaMessageError}` : ""
      cNameError ? messageError = `• ${cNameMessageError}` : ""
      titleError ? messageError = `• ${titleMessageError}` : ""

      Toast.show({ type: "error", text1: "Por favor revise el formulario", text2: messageError, })
    } else {
      await Database.createPost(collection, user, pic, {
        title,
        contactName,
        desc,
        wpp: contactNumber,
        zone: area,
      });
      Toast.show({ type: "success", text1: "Se ha creado una publicación con exito" });
      setTimeout(() => {
        setVisible(false);
      }, 3000)
      setIsDisable(false);
    }
  }

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
    if (!result.cancelled) {
      setPic(result.uri);
    }
  }

  return (

    <ScrollView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.paragraph}>
          {formTitle}
        </Text>
        <Text onPress={() => setVisible(false)}>
          <AntDesign name="down" size={24} color="black" />
        </Text>
      </View>
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
        value={contactName}
        onChangeText={text => setContactName(text)} />
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
        value={desc}
        onChangeText={text => setDesc(text)} />
      <Text style={styles.formItemTitle}>
        Whatsapp
      </Text>
      <TextInput style={styles.input}
        placeholder="Sin +54 9 y con 11. Ej: 1122334455"
        keyboardType="phone-pad"
        value={contactNumber}
        onChangeText={text => setContactNumber(text)} />
      <Text
        style={styles.formItemTitle}>
        Agregar una foto
      </Text>
      <TouchableOpacity style={styles.imageContainer} onPress={readImage}>
        <View>
          {pic
            ? <Image source={{ uri: pic }} style={styles.singleImage} />
            : <Image source={require("../assets/add-picture-icon.png")} style={styles.singleImage} />}
        </View>
      </TouchableOpacity>
      <Button title="Publicar" onPress={saveForm} disabled={isDisable} />
      <Toast />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    padding: 5
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  paragraph: {
    // margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  formItemTitle: {
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
