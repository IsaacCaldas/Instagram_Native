import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native'

import Post from './components/Post'
import { posts } from '../../utils/feed_data'

export default function Feed() {

  return (
    <FlatList 
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      data={posts}
      renderItem={({item}) => <Post data={item}/>}
    />
  )
}