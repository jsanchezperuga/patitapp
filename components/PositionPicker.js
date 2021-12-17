import React, { useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import getCityByCoordinates from '../utils/getCityByCoordinates';
import MapsZoomController from './Maps/MapsZoomController';

export default function PositionPicker({ userLocation, locationInfoText, setCoords, setArea, setIsSelectingArea }) {
  const [petLocation, setPetLocation] = useState(userLocation);
  const [zoomLevel, setZoomLevel] = useState({ latitudeDelta: 0.023831381446599992, longitudeDelta: 0.010881791311299994 })
  const map = useRef();

  const setPosition = async () => {
    let address = await getCityByCoordinates(petLocation);
    setCoords(petLocation)
    setArea(address);
    setIsSelectingArea(false);
  }

  return (
    <View>
      <MapView style={styles.map}
        initialRegion={{ ...petLocation, ...zoomLevel }}
        showsMyLocationButton={true}
        zoomControlEnabled={false}
        pitchEnabled={false}
        ref={map}
        onLongPress={(e) => setPetLocation(e.nativeEvent.coordinate)}>
        <Marker coordinate={petLocation}
          draggable={true}
          onDragEnd={(e) => setPetLocation(e.nativeEvent.coordinate)} />
      </MapView>
      <Text style={styles.infoText}>
        {locationInfoText}
      </Text>
      <MapsZoomController mapRef={map} location={petLocation} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      <TouchableOpacity onPress={setPosition} style={styles.acceptButton}>
        <Text style={styles.acceptButtonText}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  infoText: {
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    width: "100%",
    left: 0,
    top: 10,
    backgroundColor: "rgba(180, 120, 100, 0.6)",
    padding: 25
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  acceptButton: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    bottom: 10,
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "green",
    width: "100%"
  },
  acceptButtonText: {
    fontWeight: "bold"
  }
});