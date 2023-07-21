import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Image, ToastAndroid } from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Teamlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Avatardropmodal = ({ navigation, userName, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenulogout = async () => {
    setIsOpen(false);

    try {
      await AsyncStorage.removeItem('auth-token');
      ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error while removing auth-token from AsyncStorage:', error);
    }
  };

  const toggleMenuprofile = () => {
    setIsOpen(!isOpen);
    navigation.navigate('Profile');
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}>
        <Image source={avatar} style={styles.logo} />
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={avatarstyles.modalBackground}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <View style={avatarstyles.avatarmodalContainer}>
            <TouchableOpacity style={avatarstyles.userInfoContainer}>
              <View style={avatarstyles.userInfo}>
                <Text style={avatarstyles.userNameText}>{userName}</Text>
                <Text style={avatarstyles.userRoleText}>{userRole}</Text>
              </View>
            </TouchableOpacity>
            <View style={avatarstyles.iconsContainer}>
                <TouchableOpacity style={avatarstyles.avatarmenuItem} onPress={toggleMenuprofile}>
                  <Icon name="user" size={20} color="black" style={avatarstyles.avatarmenuIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={avatarstyles.avatarmenuItem} onPress={toggleMenulogout}>
                  <Icon name="sign-out" size={20} color="black" style={avatarstyles.avatarmenuIcon} />
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
    width: 100,
    height: 100,
    borderRadius: 10,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userRoleText: {
    fontSize: 10,
    color: 'black',
  },
  avatarmenuItem: {

  },
  avatarmenuText: {
    fontSize: 16,
    color: 'black',
  },
  avatarmenuIcon: {
    marginRight: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
