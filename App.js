import { StatusBar as Bar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, StatusBar, Platform } from 'react-native';
import tw from "twrnc"
import background from "./assets/test/background.jpeg"
import brand from "./assets/patitapp.png"

export default function App() {
  return (
      <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <Image source={brand} style={{ height: 160, width: 240 }} />
        <StatusBar backgroundColor="transparent"/>
        <Bar style="auto" />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    paddingTop: Platform && Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
