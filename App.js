import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Authentication from './screens/Authentication';
import AppNavigator from './screens/AppNavigator';
import DataProvider from './contexts/GlobalContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Authentication" component={Authentication} />
          <Stack.Screen options={{ headerShown: false }} name="AppNavigator" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </DataProvider>
  )
}
