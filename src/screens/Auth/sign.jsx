import { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'

import { AuthContext } from '../../context/auth'
import { inform } from '../../utils/inform'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Sign() {

  const { signed, signIn, signUp, isLogin, setSignType } = useContext(AuthContext)

  const [checked, setChecked] = useState(false)
  const [checkBoxColor, setCheckBoxColor] = useState('none')

  const [name, setName] = useState('')
  const [nickname, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')

  useEffect(() => {
    checked ? setCheckBoxColor('#a33573') : setCheckBoxColor('none')
  }, [checked])

  useEffect(() => {
    signed && cleanLabels()
  }, [signed])

  const hasEmptyLabel = () => {
    let labels = [email.trim(), password.trim()]
    if (!isLogin) labels.push(name.trim(), nickname.trim(), password_confirmation.trim())

    if (labels.includes("")) {
      return true
    }
    else {
      return false
    }
  }

  const passwordsNotEquals = () => password !== password_confirmation ? true : false

  function handleSign() {
    if (hasEmptyLabel()) {
      inform('Fill all fields')
      return
    }
    if (!isLogin && passwordsNotEquals()) {
      inform('Passwords not equals')
      return
    }

    if (isLogin) {
      signIn(email, password, checked)
    }
    else {
      let user_created = signUp(name, nickname, email, password)
      user_created && cleanLabels()
    }
  }

  function cleanLabels() {
    setName('')
    setNickName('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
  }

  return (
    <View style={styles.box}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>{isLogin ? 'SignIn' : 'SignUp'}</Text>
      </View>
      {!isLogin &&
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Enter your name"
        />
      }
      {!isLogin &&
        <TextInput
          style={styles.input}
          onChangeText={text => setNickName(text)}
          value={nickname}
          placeholder="Enter your nickname"
        />
      }
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Enter your email"
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Enter your password"
      />
      {!isLogin &&
        <TextInput
          style={styles.input}
          onChangeText={text => setPasswordConfirmation(text)}
          value={password_confirmation}
          secureTextEntry={true}
          placeholder="Confirm your password"
        />
      }
      {isLogin &&
        <View style={styles.rememberArea}>
          <TouchableOpacity style={[styles.checkbox, {
            borderColor: '#a33573', backgroundColor: checkBoxColor
          }]} onPress={() => setChecked(!checked)}>
            {checked && <FontAwesome name='check' size={16} color='#fff' />}
          </TouchableOpacity>
          <Text style={styles.rememberAreaText}>Remember me</Text>
        </View>
      }
      <TouchableOpacity style={styles.btnSign} onPress={() => handleSign()}>
        <Text style={styles.btnText}>{isLogin ? 'SignIn' : 'SignUp'}</Text>
      </TouchableOpacity>
      <Text style={styles.rememberAreaText}>
        {isLogin ? "You don't have an account?" : 'You have an account?'}
        <TouchableOpacity onPress={() => setSignType(!isLogin)}>
          <Text style={styles.signBtnText}>{isLogin ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 30,
    justifyContent: 'center',
  },
  titleArea: {
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
  rememberArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rememberAreaText: {
    marginLeft: 5,
    fontSize: 16
  },
  signBtnText: {
    fontSize: 16,
    color: '#a33573',
    fontWeight: 'bold',
    top: 3,
    marginLeft: 5
  }
})