import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { Gravatar } from 'react-native-gravatar'

import Sign from '../Auth/sign'

export default function Profile() {

  const [hasAuthenticated, setAuth] = useState(true)

  const logout = async () => {
    Alert.alert('You sign out')
  }

  return (
    <>
      { hasAuthenticated ?
        <View style={styles.box}>
          <View style={styles.profileArea}>
            <View style={styles.userArea}>
              <Gravatar
                options={{
                  email: 'isaaccaldasgoncalves@gmail.com',
                  parameters: { "size": "200", "d": "mm" },
                  secure: true
                }}
                style={styles.roundedProfileImage}
              />
              <View>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>john.doe@who.com</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => logout()} style={[styles.btnLogout, { width: 100 }]}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <Sign/>
      }
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 18,
  },
  profileArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  userArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnLogout: {
    width: 150,
    height: 50,
    backgroundColor: '#a33573',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  roundedProfileImage: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 30,
    marginRight: 2
  }
})