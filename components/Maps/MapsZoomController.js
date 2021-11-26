import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function MapsZoomController({ mapRef, location, zoomLevel, setZoomLevel }) {

  const zoomIn = () => {
    let latitudeDelta = zoomLevel.latitudeDelta * 0.7;
    let longitudeDelta = zoomLevel.longitudeDelta * 0.7;
    setZoomLevel({ latitudeDelta, longitudeDelta })
    mapRef.current.animateToRegion({ ...location, ...{ latitudeDelta, longitudeDelta } }, 700)
  }

  const zoomOut = () => {
    let latitudeDelta = zoomLevel.latitudeDelta * 1.3;
    let longitudeDelta = zoomLevel.longitudeDelta * 1.3;
    setZoomLevel({ latitudeDelta, longitudeDelta })
    mapRef.current.animateToRegion({ ...location, ...{ latitudeDelta, longitudeDelta } }, 700)
  }

  return (
    <View style={styles.zoomButtonsContainer}>
      <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
        <AntDesign name="plus" size={38} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
        <AntDesign name="minus" size={38} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  zoomButtonsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    position: 'absolute',
    height: "15%",
    right: "6%",
    bottom: "30%"
  },
  zoomButton: {
    backgroundColor: "black",
    borderRadius: 10
  }
})