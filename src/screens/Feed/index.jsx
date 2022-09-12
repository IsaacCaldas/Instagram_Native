import { useState, useEffect, useContext } from 'react'
import { FlatList, View } from 'react-native'

import firebase from '../../utils/firebase_conn'
import { AuthContext } from '../../context/auth'

import Post from './components/Post'

export default function Feed() {
  const { signed, user } = useContext(AuthContext)

  const [posts, setPosts] = useState([])

  useEffect(() => fetchPosts(), [])

  async function fetchPosts() {
    await firebase.database().ref('posts').orderByChild("date").on('value', (snapshot) => {
      let posts_from_firebase = []
      snapshot?.forEach(post => {
        posts_from_firebase.push({
          id: post.key,
          author: post.val().author,
          author_img: post.val().author_img,
          post_img: post.val().post_img,
          author_comment: post.val().author_comment,
          comments_counter: post.val().comments_counter,
          verified: post.val().verified,
          story_present: post.val().story_present,
          auto_liked: post.val().auto_liked,
          date: post.val().date,
        })
      })
      setPosts(posts_from_firebase)
    })
  }

  return (
    <>
      {posts?.length > 0 ?
        <FlatList
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => <Post data={item} />}
        />
        :
        <View />
      }
    </>
  )
}