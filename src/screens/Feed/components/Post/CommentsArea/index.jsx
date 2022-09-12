import { useState, useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native'

import firebase from '../../../../../utils/firebase_conn'
import { inform } from '../../../../../utils/inform'
import { AuthContext } from '../../../../../context/auth'

export default function CommentsArea({
  principalComment, handleFormat, setCommentFormat,
  author, comments, comments_counter, author_img, setModalVisible,
  isModal, author_comment, post_id, fetchComments
}) {

  const { user } = useContext(AuthContext)

  const [newComment, setNewComment] = useState('')

  async function AddNewComment() {
    if (newComment.trim() !== '') {
      let new_comment = await firebase.database().ref('comments').child(post_id)
      let key = new_comment.push().key
      new_comment.child(key).set({
        id: user.uid,
        nickname: user.nickname,
        comment: newComment
      }).then(async () => {
        await firebase.database().ref('posts').child(post_id).update({
          comments_counter: comments_counter + 1,
        }).catch((error) => {
          inform("Internal error, try again later")
        })
        fetchComments(post_id)
      }).catch((error) => {
        inform("Internal error, try again later")
      })
    }
  }

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
          <Text style={styles.smallText}>View all {comments_counter} comments</Text>
        </TouchableOpacity>
      }
      {isModal && comments && comments.map((item) => (
        <Text style={{ marginVertical: 2 }}><Text style={styles.authorName}>{item.nickname}</Text> {item.comment}</Text>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.smallText, { marginLeft: 5, color: '#111' }]}
                onChangeText={text => setNewComment(text)}
                value={newComment}
                placeholder="Add a comment..."
              />
              <TouchableOpacity onPress={() => AddNewComment()} style={styles.btnSend}>
                <Text style={{ color: '#fff', marginLeft: 5 }}>Send</Text>
              </TouchableOpacity>
            </View>
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
  },
  btnSend: {
    width: 60,
    height: 30,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a33573',
    borderRadius: 10
  }
})