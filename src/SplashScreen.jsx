import { View, Text } from 'react-native'

export default function SplashScreen() {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <Text style={{
        fontSize: 26,
        fontWeight: 'lighter',
        color: '#a33573'
      }}>Seja bem vindo ao InstaClone!</Text>
    </View>
  )
}