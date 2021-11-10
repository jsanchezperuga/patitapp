import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DataContext } from '../contexts/GlobalContext';
import Home from './Home';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user } = useContext(DataContext)

  return (
    <Tab.Navigator
      backBehavior="order"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          title: user.user.displayName != undefined ? "Bienvenid@ " + user.user.displayName : "Bienvenido anonimo"
        }} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  )
}