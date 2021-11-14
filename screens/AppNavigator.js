import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DataContext } from '../contexts/GlobalContext';
import Home from './Home';
import Settings from './Settings';
import NewPost from './NewPost';
import PostForm from '../components/PostForm';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user } = useContext(DataContext)

  return (
    <Tab.Navigator
      backBehavior="order"
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Create post"
        component={NewPost}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
          title: "Nuevo aviso",
        }} />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          title: "Inicio",
          headerShown: false
        }} />
      <Tab.Screen
        name="Settings"
        component={PostForm}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
          title: "Configuración"
        }} />
    </Tab.Navigator>
  )
}