import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Actions({setLikedPost, likedPost}) {
  return (
    <View style={styles.postActionsIconsArea}>
      <TouchableOpacity onPress={() => setLikedPost(!likedPost)}>
        <AntDesign
          name={likedPost ? 'heart' : 'hearto'}
          size={30} color={likedPost ? '#a33573' : '#111'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Hello')}>
        <Ionicons
          style={{ marginLeft: 15 }}
          name={'chatbubble-outline'}
          size={30}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  postActionsIconsArea: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
})