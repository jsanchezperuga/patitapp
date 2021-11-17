import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import PostForm from '../components/PostForm'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import generatePlaceHolders from '../utils/generatePlaceholders';

export default function NewPost() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(null);

  const openModal = (type) => {
    let placeholders = generatePlaceHolders(type);
    setVisible(true);
    setForm(
      <PostForm {...placeholders} setVisible={setVisible} />
    );
  }

  return (
    <View style={styles.container}>
      {form && <ReactNativeModal onBackButtonPress={() => setVisible(false)} children={form} isVisible={visible} style={{margin: 0}} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => openModal("lost")}
          style={styles.buttonLost}>
            <View>
            <Image source={require("../assets/exclamation.png")} style={styles.foundIcon} />
            <Text style={styles.buttonText}>Crear aviso de Perdido</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => openModal("found")}
          style={styles.buttonFound}>
          <View>
            <Image source={require("../assets/tick.png")} style={styles.foundIcon} />
            <Text style={styles.buttonText}>Crear aviso de Encontrado</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
  },
  buttonLost: {
    flex: 1,
    backgroundColor: '#F08700',
    width: '80%',
    height: '80%',
    marginTop: 25,
    margin: 20,
    borderRadius: 30,
    alignSelf:'center',
    justifyContent:'center',
  },
  buttonFound: {
    flex: 1,
    backgroundColor: '#0782F9',
    width: '80%',
    height: '80%',
    margin: 20,
    borderRadius: 30,    
    alignSelf:'center',    
    justifyContent:'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    padding: 5
  },
  foundIcon: {
    alignSelf:'center'
  }
})