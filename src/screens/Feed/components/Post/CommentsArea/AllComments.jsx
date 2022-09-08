import { StyleSheet, View, TouchableOpacity, Modal, ScrollView } from 'react-native'

// components
import Photo from '../Photo'
import CommentsArea from './index'

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function AllComments({
  setVisible, visible, author_comment,
  principalComment, handleFormat, setCommentFormat,
  post_img, author, comments, author_img
}) {

  return (
    <View style={styles.box}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.btnModal}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <FontAwesome name='close' size={25} color='#aaa' />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.box}>
            <Photo post_img={post_img} />
            <CommentsArea
              isModal
              principalComment={principalComment}
              handleFormat={handleFormat}
              setCommentFormat={setCommentFormat}
              setModalVisible={setVisible}
              author={author}
              comments={comments}
              author_img={author_img}
              author_comment={author_comment}
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    marginVertical: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  btnModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
    marginBottom: 5
  }
})