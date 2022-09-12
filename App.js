import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Header from './src/screens/components/Header'
import TabsNavigator from './src/routes/navigator'
import AuthProvider from './src/context/auth'

import SplashScreen from './src/SplashScreen'

console.disableYellowBox = true
export default function App() {

  const [isLoad, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000);
  }, [])

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <AuthProvider>
          { !isLoad ?
            <SplashScreen/>
            :  
            <>
              <Header/>
              <TabsNavigator/>
            </>          
          }
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})
