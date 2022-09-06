import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Feed() {

  const [principalCommentFormated, setFormatedComment] = useState('')
  const [likedPost, setLikedPost] = useState(false)

  let comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id ligula imperdiet, pulvinar ligula sit amet, pulvinar nisl. Proin eleifend ultricies massa ut cursus. Maecenas aliquam tortor lacus, rhoncus ullamcorper neque eleifend hendrerit. Vestibulum feugiat lobortis placerat. Sed dui magna, mattis in tristique molestie, vehicula ac orci. Sed fermentum dui ut tincidunt lobortis. Vivamus interdum leo felis, vitae efficitur mauris facilisis non.'

  const users = [
    { id: 0, name: 'isaac_caldas' },
    { id: 1, name: 'john_doe' },
    { id: 2, name: 'fulano.de.tal' },
  ]

  useEffect(() => {
    let comment_to_format = comment.split('').splice(0, 85)
    comment_to_format.push('...')
    setFormatedComment(comment_to_format.join(''))
  }, [])

  return (
    <View style={styles.box}>
      <View style={styles.postHeader}>
        <View style={styles.authorDiv}>
          <View style={styles.authorPhotoBorder}>
            <Image
              resizeMode="cover"
              source={{ uri: 'https://cdn.abcdoabc.com.br/PewDiePie_c5a3e719.jpg' }}
              style={styles.authorPhotoArea}
            />
          </View>
          <Text style={styles.authorName}>{users[0].name}</Text>
        </View>
        <TouchableOpacity>
          <Entypo
            name='dots-three-horizontal'
            size={16} color='#111'
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', height: 400 }}>
        <Image
          resizeMode="cover"
          source={{ uri: 'https://s2.glbimg.com/XO0RqOfPoqlUe9WlwYNVBlNJI3k=/e.glbimg.com/og/ed/f/original/2019/08/14/1024px-star_world_mountain_-_beto_carrero_world_1.jpg' }}
          style={styles.postImage}
        />
      </View>
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
      <View style={styles.commentsArea}>
        <Text style={styles.authorComment}>
          <Text style={styles.authorName}>{users[0].name}</Text> {principalCommentFormated}
          <TouchableOpacity>
            <Text style={[styles.smallText, { marginTop: 0 }]}>  more</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity>
          <Text style={styles.smallText}>View all 99 comments</Text>
        </TouchableOpacity>
        <View>
          <View style={styles.addNewCommentArea}>
            <Image
              resizeMode="cover"
              source={{ uri: 'https://cdn.abcdoabc.com.br/PewDiePie_c5a3e719.jpg' }}
              style={styles.authorPhotoCommentArea}
            />
            <TouchableOpacity>
              <Text style={[styles.smallText, { marginLeft: 5 }]}>Add a comment...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%'
  },
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
    borderWidth: 3,
    borderColor: '#a33573',
    borderRadius: 22,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authorPhotoArea: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#a33573'
  },
  authorPhoto: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  authorName: {
    fontWeight: 'bold',
    marginLeft: 10
  },
  postImage: {
    width: '100%',
    height: 400,
    alignItems: 'center'
  },
  postActionsIconsArea: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  commentsArea: {
    paddingHorizontal: 10
  },
  authorComment: {
    textAlign: 'left'
  },
  userLinked: {
    color: '#4a64aa',
  },
  smallText: {
    color: '#888',
    marginTop: 6,
    fontSize: 14
  },
  addNewCommentArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  authorPhotoCommentArea: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#777'
  }
})