import { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

// components
import Header from './Header'
import Photo from './Photo'
import Actions from './Actions'
import CommentsArea from './CommentsArea'
import AllComments from './CommentsArea/AllComments'

import firebase from '../../../../utils/firebase_conn'

//icons

export default function Post({ data }) {

  const [comments, setComments] = useState([])

  const [principalCommentFormated, setFormatedComment] = useState('')
  const [commentFormated, setCommentFormated] = useState('')
  const [handleCommentFormat, setHandleCommentFormat] = useState(true)
  const [likedPost, setLikedPost] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetchComments()
    handleFormat()
  }, [])

  useEffect(() => {
    handleFormat()
  }, [handleCommentFormat])

  function handleFormat() {
    if (handleCommentFormat) {
      if (commentFormated && commentFormated !== "") {
        setFormatedComment(commentFormated)
        return
      }
      let comment = data?.author_comment.split('').splice(0, 85)
      comment.push('...')
      setCommentFormated(comment.join(''))
      setFormatedComment(comment.join(''))
    } else {
      setFormatedComment(data.author_comment)
    }
  }

  async function fetchComments(post_id) {
    await firebase.database().ref('comments').child(post_id || data.id).on('value', (snapshot) => {
      let comments_ = []
      snapshot?.forEach(comment => {
        comments_.push({
          id: comment.key,
          nickname: comment.val().nickname,
          comment: comment.val().comment
        })
      })
      setComments(comments_)
    })
  }


  return (
    <View style={styles.box}>
      <Header
        author={data.author.nickname}
        author_img={data.author_img}
        story_present={data.story_present}
        verified={data.verified}
      />
      <Photo post_img={data.post_img} />
      <Actions setLikedPost={setLikedPost} likedPost={likedPost} />
      <CommentsArea
        principalComment={principalCommentFormated}
        handleFormat={handleCommentFormat}
        setCommentFormat={setHandleCommentFormat}
        setModalVisible={setModalVisible}
        author={data.author.nickname}
        comments_counter={data.comments_counter}
        author_img={data.author_img}
      />
      <AllComments 
        setVisible={setModalVisible}
        visible={modalVisible}
        principalComment={principalCommentFormated}
        handleFormat={handleCommentFormat}
        setCommentFormat={setHandleCommentFormat}
        setModalVisible={setModalVisible}
        post_img={data.post_img} 
        author={data.author.nickname}
        comments={comments}
        comments_counter={data.comments_counter}
        author_comment={data.author_comment}
        author_img={data.author_img}
        post_id={data.id}
        author_id={data.author.uid}
        fetchComments={fetchComments}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    marginVertical: 5
  }
})