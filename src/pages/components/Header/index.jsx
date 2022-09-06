import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Feed() {

  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={() => console.log('Hello')}>
        <Feather
          name='camera'
          size={30}
        />
      </TouchableOpacity>
      <Image
        resizeMode="cover"
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => console.log('Hello')}>
        <Ionicons
          style={{ marginLeft: 15 }}
          name={'chatbubble-outline'}
          size={30}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb'
  },
  logo: {
    width: 120,
    height: 45
  }
})