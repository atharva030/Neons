import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import {statusCodes} from 'react-native-google-signin';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import styles from '../Styles/Teamlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import {Alert} from 'react-native';
const defaultAvatar = require('../../assets/Image/profile1.png');
const Avatardropmodal = ({
  navigation,
  userName,
  userDes,
  removeUser,
  photoUrl,
}) => {
  console.log('AVATAR ', photoUrl);
  const FallbackAvatar = ({size}) => (
    <Image
      source={defaultAvatar}
      style={{width: size, height: size, borderRadius: size / 2}}
    />
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const data = JSON.parse(userData);
        console.log('after logout', data);
      } else {
        console.log('User data not found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error while retrieving user data:', error);
    }
  };
  const toggleMenulogout = async () => {
    setIsOpen(false);
    await AsyncStorage.removeItem('user')
      .then(() => {
        getUserData();
        removeUser();

        ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);

        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
        GoogleSignin.signOut();
      })
      .catch(error => {
        console.log(
          'Error while removing auth-token from AsyncStorage:',
          error,
        );
      });
  };

  const toggleMenuprofile = () => {
    setIsOpen(!isOpen);
    navigation.navigate('Profile');
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}>
        {photoUrl ? (
          <Image source={{uri: photoUrl}} style={styles.logo} />
        ) : (
          <Image source={defaultAvatar} style={styles.logo} />
        )}
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}>
        <TouchableOpacity
          style={avatarstyles.modalBackground}
          activeOpacity={1}
          onPress={toggleMenu}>
          <View style={avatarstyles.avatarmodalContainer}>
            <View style={avatarstyles.userInfoContainer}>
              <Avatar.Image
                size={44}
                source={photoUrl ? {uri: photoUrl} : defaultAvatar}
                fallback={<FallbackAvatar size={44} />}
              />
              <View style={avatarstyles.userInfo}>
                <Text style={avatarstyles.userNameText}>{userName}</Text>
                <Text style={avatarstyles.userRoleText}>{userDes}</Text>
              </View>
            </View>
            <View style={avatarstyles.iconsContainer}>
              <TouchableOpacity
                style={avatarstyles.avatarmenuItem}
                onPress={toggleMenuprofile}>
                {/* <Icon name="user" size={20} color="black" style={avatarstyles.avatarmenuIcon} /> */}
              </TouchableOpacity>
              <TouchableOpacity style={avatarstyles.avatarmenuItem}>
                {/* <Icon name="sign-out" size={20} color="black" style={avatarstyles.avatarmenuIcon} />
                 */}
                <Button
                  mode="contained"
                  icon="logout"
                  style={{backgroundColor: '#351C4F', marginTop: 10}}
                  textColor="#fff"
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to Logout?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          onPress: toggleMenulogout, // Wrap the function call inside an arrow function
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  Sign Out
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const avatarstyles = StyleSheet.create({
  avatarmodalContainer: {
    position: 'absolute',
    marginTop: 80,
    right: 13,
    backgroundColor: 'white',
    width: '60%',
    height: '28%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOpacity: 0.2,
    backgroundColor: '#f6f8fc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
  },
  userInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: '50%',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  // userInfo: {
  //   flex: 1,
  // },
  userNameText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#1E010B',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  userRoleText: {
    fontSize: 14,
    color: '#835D3C',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  avatarmenuItem: {},
  avatarmenuText: {
    fontSize: 16,
    color: 'black',
  },
  avatarmenuIcon: {
    marginRight: 10,
  },
  modalBackground: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignSelf: 'center',
    gap: 15,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
  },
});

export default Avatardropmodal;
