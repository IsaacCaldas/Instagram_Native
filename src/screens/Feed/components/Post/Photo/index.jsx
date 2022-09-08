import { StyleSheet, View, Image } from 'react-native'

export default function Photo({post_img}) {
  return (
    <View style={{ width: '100%', height: 400 }}>
      <Image
        resizeMode="cover"
        source={{ uri: post_img }}
        style={styles.postImage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  postImage: {
    width: '100%',
    height: 400,
    alignItems: 'center'
  }
})