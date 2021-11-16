import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import PostForm from '../components/PostForm'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default function NewPost() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(null);
  
  const openModal = (type)=>{
    if(type =='lost'){
      const data = {formTitle:'Crear aviso de PERDIDO', titlePlaceHolder:'Ej: Se perdió mi perro Pepe', contactPlaceHolder: 'Nombre contacto', areaPlaceHolder:'Barrio en el que se perdió',channelPlaceHolder:'Número de Whatsapp del contacto'}
      setForm(
        <PostForm {...data}/>
      )
    }
    setVisible(true)
  }

  return (
    <View style={styles.container}>
      {form && <ReactNativeModal children={form} isVisible={visible} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          //acá se invoca el modal
          onPress={()=> openModal('lost')}           
          style={styles.button}
        >
          <Text style={styles.buttonText}>Crear aviso de perdido</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          //acá se invoca el modal
          onPress={()=> openModal('found')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Crear aviso de encontrado</Text>
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
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,

  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    padding: 5
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  googleButton: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
  }
})