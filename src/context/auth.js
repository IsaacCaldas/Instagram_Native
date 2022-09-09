import { useState, useEffect, createContext } from "react"
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import firebase from '../utils/firebase_conn'
import { inform } from "../utils/inform"

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const navigation = useNavigation()

  const [isLogin, setSignType] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => getUserFromStorage(), [])

  async function signUp(name, email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(async (value) => {
      let uid = value.user.uid
      await firebase.database().ref('users').child(uid).set({
        name,
        email
      }).then(() => {
        inform('Your account has been registered')
        setSignType(true)
        return true
      }).catch((error) => {
        handleErrors(error.code)
        return false
      })
    }).catch((error) => {
      console.log('CRIAR NO AUTH')
      handleErrors(error.code)
      return false
    })
  }

  async function signIn(email, password, checked) {
    let signed_ = false 
    await firebase.auth().signInWithEmailAndPassword(email, password).then(async (value) => {
      let uid = value.user.uid
      await firebase.database().ref('users').child(uid).once('value')
        .then((snapshot) => {
          let data = {
            uid,
            name: snapshot.val().name,
            email: value.user.email
          }
          setUser(data)
          checked && toStore(data)
          signed_ = true
        }).catch((error) => {
          handleErrors(error.code)
          return false
        })
      setUser(value.user.uid)
    }).catch((error) => {
      console.log('SIGN IN LOGIN ERROU HEIN')
      handleErrors(error.code)
      return false
    })

    signed_ && navigation.navigate('Feed')
  }

  async function signOut() {
    await firebase.auth().signOut()
    await AsyncStorage.clear().then(() => setUser(null)).catch(err => inform('An error has been ocurred'))
  }

  function handleErrors(err_code) {
    switch (err_code) {
      case 'auth/email-already-in-use':
        inform('Email already in use')
        break
      case 'auth/invalid-email':
        inform('Email invalid')
        break
      case 'auth/weak-password':
        inform('Password is weak, needs to be at least 6 characters')
        break
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        inform('Email or password is wrong')
        break
      default:
        inform('Internal server error')
    }
  }

  const toStore = async (data) => await AsyncStorage.setItem('auth_user', JSON.stringify(data))

  async function getUserFromStorage() {
    let auth_user = await AsyncStorage.getItem('auth_user')
    auth_user && setUser(JSON.parse(auth_user))
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, isLogin, signIn, signUp, signOut, setSignType }}>
      {children}
    </AuthContext.Provider>
  )
}