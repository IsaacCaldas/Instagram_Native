import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FA from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation';

import Feed from '../screens/Feed'
import AddPhoto from '../screens/AddPhoto'
import Profile from '../screens/Profile'
import Sign from '../screens/Auth/sign'

const Tab = createBottomTabNavigator()

export default function TabsNavigator() {
  return (
    <NavigationContainer>
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
            tabBarIcon: () => <Foundation name="home" color="#111" size={30}/>
          }}
        />
        <Tab.Screen
          name="AddPhoto"
          component={AddPhoto}
          options={{
            tabBarLabel: 'Add Photo',
            tabBarIcon: () => <FA name="camera" color="#111" size={30}/>
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Sign}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => <FA name="user" color="#111" size={30}/>
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

