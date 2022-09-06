import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

import Feed from './src/pages/Feed'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
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
