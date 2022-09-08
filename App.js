import { StyleSheet, SafeAreaView } from 'react-native'

import Header from './src/screens/components/Header'
import TabsNavigator from './src/routes/navigator'

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <TabsNavigator/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
