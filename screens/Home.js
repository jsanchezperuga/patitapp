import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Database from '../database';
import ReactNativeModal from 'react-native-modal'
import PetsList from '../components/PetsList'

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [post, setPost] = useState(null);
  const [lostPets, setLostPets] = useState(null)
  const [foundPets, setFoundPets] = useState(null)

  useEffect(() => {
    async function getPost() {
      setLostPets(await Database.getPosts("lostPets"));
      setFoundPets(await Database.getPosts("foundPets"));
    }
    getPost()
  }, [])

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      {/* Implementar mapa/integracion con google maps?? */}
      {post && <ReactNativeModal onBackButtonPress={() => setVisible(false)} children={post} isVisible={visible} style={{ margin: 0 }} />}
      {(lostPets && foundPets)
        ? <>
          <PetsList title="Mascotas Perdidas" pets={lostPets} setVisible={setVisible} setPost={setPost} />
          <PetsList title="Mascotas Encontradas" pets={foundPets} setVisible={setVisible} setPost={setPost} />
        </>
        : <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
    </View>
  )
}