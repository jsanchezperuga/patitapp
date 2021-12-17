import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Database from '../database';
import ReactNativeModal from 'react-native-modal'
import PetsMapList from '../components/PetsMapList';
import LoadingComponent from '../components/LoadingComponent';

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
    <View style={styles.container}>
      {post && <ReactNativeModal onBackButtonPress={() => setVisible(false)} children={post} isVisible={visible} style={{ margin: 0 }} />}
      {(lostPets && foundPets)
        ? <PetsMapList pets={[...lostPets, ...foundPets]} setPost={setPost} setVisible={setVisible} />
        : <LoadingComponent />
      }
    </View>
  )
}