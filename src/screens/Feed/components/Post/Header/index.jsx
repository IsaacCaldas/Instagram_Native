import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Header({author, author_img, story_present, verified}) {
  return (
    <View style={styles.postHeader}>
      <View style={styles.authorDiv}>
        <View style={story_present && styles.authorPhotoBorder}>
          <Image
            resizeMode="cover"
            source={{ uri: author_img }}
            style={styles.authorPhotoArea}
          />
        </View>
        <View style={styles.authorNameArea}>
          <Text style={styles.authorName}>{author}</Text>
          {verified && <MaterialIcons name='verified' size={16} color='#4a64aa' />}
        </View>
      </View>
      <TouchableOpacity>
        <Entypo name='dots-three-horizontal' size={16} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  postHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  authorDiv: {
    width: 100,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  authorPhotoBorder: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: '#a33573',
    borderRadius: 22,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authorPhotoArea: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#a33573'
  },
  authorPhoto: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  authorNameArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '200%'
  },
  authorName: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 3
  }
})