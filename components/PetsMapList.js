import React, { useContext, useRef, useState } from 'react'
import MapView, { Circle, Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { DataContext } from '../contexts/GlobalContext';
import PostInfo from './PostInfo';
import MapsZoomController from './Maps/MapsZoomController';

export default function PetsMapList({ pets, setPost, setVisible }) {
  const { location } = useContext(DataContext)
  const [zoomLevel, setZoomLevel] = useState({ latitudeDelta: 0.3, longitudeDelta: 0.3 });
  const map = useRef();

  return (
    <View>
      <MapView style={styles.map}
        initialRegion={{ ...location, ...zoomLevel }}
        zoomControlEnabled={false}
        showsMyLocationButton={true}
        pitchEnabled={false}
        ref={map}>
        <Circle center={location} {...mapStyles.userCircle} />
        {pets.map(pet => <PetMapItem pet={pet} key={pet.id} setPost={setPost} setVisible={setVisible} />)}
      </MapView>
      <MapsZoomController mapRef={map} location={location} zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
    </View>
  )
}

function PetMapItem({ pet, setPost, setVisible }) {
  const styles = pet.postType === "foundPets" ? mapStyles.foundCircle : mapStyles.lostCircle;
  const pinColor = pet.postType === "foundPets" ? "blue" : "red";

  const openModal = () => {
    setVisible(true);
    setPost(
      <PostInfo {...pet} setVisible={setVisible} />
    )
  }

  return (
    <View>
      <Circle center={pet.coords} {...styles} />
      <Marker
        pinColor={pinColor}
        title={pet.title}
        coordinate={pet.coords}
        onPress={openModal} />
    </View>
  )
}

const mapStyles = {
  userCircle: {
    fillColor: "rgba(187, 255, 120, 0.5)",
    strokeWidth: 0,
    radius: 5000
  },
  lostMarker: {

  },
  lostCircle: {
    fillColor: "rgba(245, 81, 81, 0.4)",
    strokeWidth: 0,
    radius: 300
  },
  foundMarker: {

  },
  foundCircle: {
    fillColor: "rgba(16, 135, 204, 0.4)",
    strokeWidth: 0,
    radius: 300
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});