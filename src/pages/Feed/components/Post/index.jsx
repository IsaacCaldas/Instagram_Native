import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Post({ data }) {

  const [principalCommentFormated, setFormatedComment] = useState('')
  const [commentFormated, setCommentFormated] = useState('')
  const [handleCommentFormat, setHandleCommentFormat] = useState(true)
  const [likedPost, setLikedPost] = useState(false)

  useEffect(() => {
    let comment = data?.author_comment
    console.log(comment)
    comment = comment.split('').splice(0, 85)
    console.log(comment)
    comment.push('...')
    console.log(comment)
    setCommentFormated(comment.join(''))
    handleFormat()
  }, [])

  useEffect(() => {
    handleFormat()
  }, [handleCommentFormat])

  function handleFormat() {
    if (handleCommentFormat) {
      console.log(commentFormated)
      setCommentFormated(commentFormated)
    } else {
      console.log(data.author_comment)
      setFormatedComment(data.author_comment)
    }
  }

  return (
    <View style={styles.box}>
      <View style={styles.postHeader}>
        <View style={styles.authorDiv}>
          <View style={styles.authorPhotoBorder}>
            <Image
              resizeMode="cover"
              source={{ uri: data.author_img }}
              style={styles.authorPhotoArea}
            />
          </View>
          <View style={styles.authorNameArea}>
            <Text style={styles.authorName}>{data.author}</Text>
            {data.verified && <MaterialIcons name='verified' size={16} color='#4a64aa' />}
          </View>
        </View>
        <TouchableOpacity>
          <Entypo name='dots-three-horizontal' size={16} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', height: 400 }}>
        <Image
          resizeMode="cover"
          source={{ uri: data.post_img }}
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
          <Text style={styles.authorName}>{data.author}</Text> {principalCommentFormated}
          <TouchableOpacity onPress={() => setHandleCommentFormat(!handleCommentFormat)}>
            <Text style={[styles.smallText, { marginTop: 0 }]}>  {handleCommentFormat ? 'more' : 'less'}</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity>
          <Text style={styles.smallText}>View all {data.comments_counter} comments</Text>
        </TouchableOpacity>
        <View>
          <View style={styles.addNewCommentArea}>
            <Image
              resizeMode="cover"
              source={{ uri: data.author_img }}
              style={styles.authorPhotoCommentArea}
            />
            <TouchableOpacity>
              <Text style={[styles.smallText, { marginLeft: 5 }]}>Add a comment...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    marginVertical: 5
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