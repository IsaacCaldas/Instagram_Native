import { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

// components
import Header from './Header'
import Photo from './Photo'
import Actions from './Actions'
import CommentsArea from './CommentsArea'
import AllComments from './CommentsArea/AllComments'

//icons

export default function Post({ data }) {

  const [principalCommentFormated, setFormatedComment] = useState('')
  const [commentFormated, setCommentFormated] = useState('')
  const [handleCommentFormat, setHandleCommentFormat] = useState(true)
  const [likedPost, setLikedPost] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
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

  return (
    <View style={styles.box}>
      <Header
        author={data.author}
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
        author={data.author}
        comments={data.comments}
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
        author={data.author}
        comments={data.comments}
        author_comment={data.author_comment}
        author_img={data.author_img}
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