import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FA from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation';

import Feed from '../screens/Feed'
import AddPost from '../screens/AddPost'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowOffset: { width: 0, height: 0 },
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          elevation: 5
        }
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: () => <Foundation name="home" color="#111" size={30} />
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarLabel: 'Add Post',
          tabBarIcon: () => <FA name="camera" color="#111" size={30} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <FA name="user" color="#111" size={30} />
        }}
      />
    </Tab.Navigator>
  )
}

