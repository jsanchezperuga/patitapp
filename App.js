import React from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from "twrnc"
import Authentication from './screens/Authentication';
import AppNavigator from './screens/AppNavigator';
// import { StatusBar as Bar } from 'expo-status-bar';
// import background from "./assets/test/background.jpeg"
// import brand from "./assets/patitapp.png"

// export default function App() {
//   return (
//       <ImageBackground source={background} resizeMode="cover" style={styles.image}>
//         <Image source={brand} style={{ height: 160, width: 240 }} />
//         <StatusBar backgroundColor="transparent"/>
//         <Bar style="auto" />
//       </ImageBackground>
//   );
// }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Authentication" component={Authentication} />
        <Stack.Screen options={{headerShown: false}} name="AppNavigator" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
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
