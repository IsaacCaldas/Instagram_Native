import { useState, useContext } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
  TextInput, Image, ScrollView, Modal
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import firebase from '../../utils/firebase_conn'
import { AuthContext } from '../../context/auth'
import { inform } from '../../utils/inform'

import * as ImagePicker from 'expo-image-picker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Sign from '../Auth/sign'

export default function AddPost() {
  const navigation = useNavigation()
  const { signed, user } = useContext(AuthContext)

  const [file, setFile] = useState(null)
  const [comment, setComment] = useState(null)
  const [modalIsVisible, setModalVisibility] = useState(false)

  const openCamera = async () => {
    const camera_permission = await ImagePicker.requestCameraPermissionsAsync()
    if (camera_permission.granted === false) {
      alert("You've refused to allow this appp to access your camera!")
      return
    }
    const picture = await ImagePicker.launchCameraAsync()
    setModalVisibility(false)
    !picture.cancelled && setFile(picture.uri)
  }

  const openGallery = async () => {
    const library_permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (library_permission.granted === false) {
      alert("You've refused to allow this appp to access your photos!")
      return
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    setModalVisibility(false)
    !image.cancelled && setFile(image.uri)
  }

  async function save() {
    let new_post = await firebase.database().ref('posts')
    let key = new_post.push().key

    new_post.child(key).set({
      author: user,
      author_img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      post_img: file,
      author_comment: comment,
      comments: {
        comments_counter: 0,
        // comments_on_post: []
      },
      verified: false,
      story_present: false,
      auto_liked: false,
      date: new Date().getTime(),
    }).then(() => navigation.navigate('Feed')).catch((error) => {
      inform("Internal error, try again later")
    })
  }

  return (
    <>
      {signed ?
        <>
          <ScrollView>
            <View style={styles.box}>
              <Text style={styles.title}>Compartilhe uma imagem</Text>
              {file && <Image source={{ uri: file }} style={styles.image} />}
              <TouchableOpacity onPress={() => setModalVisibility(true)} style={styles.btnPhoto}>
                <Text style={styles.btnText}>Pick an image</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                onChangeText={text => setComment(text)}
                value={comment}
                placeholder="Add a comment..."
              />
              <TouchableOpacity onPress={() => save()} style={[styles.btnPhoto, { width: 100 }]}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalIsVisible}
            onRequestClose={() => setModalVisibility(false)}
          >
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <View style={styles.btnModal}>
                  <TouchableOpacity onPress={() => setModalVisibility(false)}>
                    <FontAwesome name='close' size={20} color='#aaa' />
                  </TouchableOpacity>
                </View>
                <View style={styles.btnArea}>
                  <TouchableOpacity style={styles.btnChoose} onPress={() => openGallery()}>
                    <Text style={styles.btnText}>Open gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnChoose} onPress={() => openCamera()}>
                    <Text style={styles.btnText}>Open camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
        :
        <Sign />
      }
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20
  },
  image: {
    marginVertical: 10,
    width: 250,
    height: 250
  },
  input: {
    width: '90%',
    height: 50,
    fontSize: 16,
    color: '#111',
    borderBottomColor: '#a33573',
    borderBottomWidth: 2,
    padding: 0,
  },
  btnPhoto: {
    width: 150,
    height: 50,
    backgroundColor: '#a33573',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 30
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnChoose: {
    width: 125,
    height: 50,
    backgroundColor: '#a33573',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    elevation: 5,
    backgroundColor: '#000000aa',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: 300,
    height: 130,
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
    marginBottom: 20
  }
})