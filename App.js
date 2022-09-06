import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

import Header from './src/pages/components/Header'
import Feed from './src/pages/Feed'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Feed/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
