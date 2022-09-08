import { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import firebase from '../../utils/firebase_conn'

export default function Sign() {
  const navigation = useNavigation()
  const [isLogin, setSignType] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setConfirmation] = useState('')

  const hasEmptyLabel = () => {
    let labels = [email, password]
    let hasEmpty = false
    if (!isLogin) labels.push(name, password_confirmation)

    if (labels.includes("")) {
      hasEmpty = true
      return hasEmpty 
    } 
    else {
      return hasEmpty
    }
  }

  const passwordsNotEquals = () => password !== password_confirmation ? true : false

  function handleSign() {
    if (hasEmptyLabel) {
      Alert.alert('Fill all fields')
      return
    }
    if (passwordsNotEquals) {
      Alert.alert('Passwords not equals')
      return
    }

    navigation.navigate('Feed') 
    
    isLogin ? signIn() : signUp()
  }

  async function signIn() {
    console.log('Oi')
  }

  async function signUp() {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((value) => {
      
      firebase.database().ref('users').child(value.user.uid).set({
        name: name,
        email: email
      })

      alert(`${value.user.email} is successfully registered`)
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      setIsNewUser(false)
      setLoad(false)

    }).catch((error) => {
      
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use')
        setEmail('')
        setLoad(false)
        return
      }
      else if (error.code === 'auth/invalid-email') {
        invalidEmail()
        return
      }
      else if (error.code === 'auth/weak-password') {
        alert('Password is weak, needs to be at least 6 characters');
        setPassword('')
        setLoad(false)
        return
      }
      else {
        serverError();
      }
    });
  }

  return (
    <View style={styles.box}>
      <Text style={styles.title}>{isLogin ? 'SignIn' : 'SignUp'}</Text>
      {!isLogin &&
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text.trim())}
          value={name}
          placeholder="Enter your name"
        />
      }
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text.trim())}
        value={email}
        placeholder="Enter your email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text.trim())}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      {!isLogin &&
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConfirmation(text.trim())}
          value={password_confirmation}
          secureTextEntry={true}
          placeholder="Confirm your password"
        />
      }
      <TouchableOpacity style={styles.btnSign} onPress={() => handleSign()}>
        <Text style={styles.btnText}>{isLogin ? 'SignIn' : 'SignUp'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  btnSign: {
    width: '100%',
    height: 50,
    backgroundColor: '#a33573',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 16,
    color: '#111',
    borderBottomColor: '#a33573',
    borderBottomWidth: 2,
    padding: 0,
    marginVertical: 10
  },
})