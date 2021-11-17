import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { AlertBox } from 'react-native-alertbox';
import Authentication from './screens/Authentication';
import AppNavigator from './screens/AppNavigator';
import DataProvider from './contexts/GlobalContext';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["Setting a timer for a long period"]);
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native"])

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Authentication" component={Authentication} />
          <Stack.Screen options={{ headerShown: false }} name="AppNavigator" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <AlertBox />
      <Toast />
    </DataProvider>
  )
}
