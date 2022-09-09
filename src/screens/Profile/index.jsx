import { useContext } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Gravatar } from 'react-native-gravatar'

import { AuthContext } from '../../context/auth'
import Sign from '../Auth/sign'

export default function Profile() {
  const { signed, signOut, user } = useContext(AuthContext)
  const logout = async () => signOut()

  return (
    <>
      { signed ?
        <View style={styles.box}>
          <View style={styles.profileArea}>
            <View style={styles.userArea}>
              <Gravatar
                options={{
                  email: user.email,
                  parameters: { "size": "200", "d": "mm" },
                  secure: true
                }}
                style={styles.roundedProfileImage}
              />
              <View>
                <Text style={styles.name}>{user.nickname}</Text>
                <Text style={styles.email}>{user.email}</Text>
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