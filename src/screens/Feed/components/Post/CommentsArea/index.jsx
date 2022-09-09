import { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native'

export default function CommentsArea({
  principalComment, handleFormat, setCommentFormat,
  author, comments, author_img, setModalVisible,
  isModal, author_comment
}) {

  const [newComment, setNewComment] = useState()

  return (
    <View style={[styles.commentsArea, { marginVertical: isModal && 10 }]}>
      <Text style={styles.authorComment}>
        <Text style={styles.authorName}>{author}</Text> {isModal ? author_comment : principalComment}
        {!isModal &&
          <TouchableOpacity onPress={() => setCommentFormat(!handleFormat)}>
            <Text style={[styles.smallText, { marginTop: 0 }]}>  {handleFormat ? 'more' : 'less'}</Text>
          </TouchableOpacity>
        }
      </Text>
      {!isModal &&
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.smallText}>View all {comments.comments_counter} comments</Text>
        </TouchableOpacity>
      }
      {isModal && comments.comments_on_post.map((item) => (
        <Text style={{ marginVertical: 2 }} key={item.id}><Text style={styles.authorName}>{item.user}</Text> {item.comment}</Text>
      ))}
      <View>
        <View style={styles.addNewCommentArea}>
          <Image
            resizeMode="cover"
            source={{ uri: author_img }}
            style={styles.authorPhotoCommentArea}
          />
          {!isModal ?
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={[styles.smallText, { marginLeft: 5 }]}>Add a comment...</Text>
            </TouchableOpacity>
            :
            <TextInput
              style={[styles.smallText, { marginLeft: 5, color: '#111' }]}
              onChangeText={() => setNewComment()}
              value={newComment}
              placeholder="Add a comment..."
            />
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentsArea: {
    paddingHorizontal: 10
  },
  authorComment: {
    textAlign: 'left'
  },
  authorName: {
    fontWeight: 'bold'
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