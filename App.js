import { StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Header from './src/screens/components/Header'
import TabsNavigator from './src/routes/navigator'
import AuthProvider from './src/context/auth'

console.disableYellowBox = true
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <AuthProvider>
          <Header />
          <TabsNavigator />
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
