import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Image,ToastAndroid  } from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Teamlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Avatardropmodal = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);

  };
  const toggleMenulogout = async () => {
    // console.log('logout pressed');
    setIsOpen(false);
  
    // Remove the auth-token from AsyncStorage
    try {
      await AsyncStorage.removeItem('auth-token');
      // console.log('auth-token removed from AsyncStorage');
  
      // Display a toast message after successful logout
      ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
      
      // After successful logout, navigate to the LoginScreen
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error while removing auth-token from AsyncStorage:', error);
    }
  };

  const toggleMenuprofile = () => {
    setIsOpen(!isOpen);
    navigation.navigate('Profile')
  }
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
        <View style={avatarstyles.avatarmodalContainer}>
          <TouchableOpacity style={avatarstyles.avatarmenuItem} onPress={toggleMenuprofile} >
            <Text style={avatarstyles.avatarmenuText}><Icon name="user" size={16} color="black" style={avatarstyles.avatarmenuIcon} /> Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={avatarstyles.avatarmenuItem} onPress={toggleMenulogout}>
            <Text style={avatarstyles.avatarmenuText}><Icon name="sign-out" size={16} color="black" style={avatarstyles.avatarmenuIcon} />Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const avatarstyles = StyleSheet.create({
  avatarmodalContainer: {
    marginTop: 80,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    width: 110,
    height: 100,
    borderRadius: 10,
    gap: 4,
    justifyContent: 'center',
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
  },
  avatarmenuItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 80,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    elevation: 2,
    marginRight: 15,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },

  },
  avatarmenuText: {
    fontSize: 14,
    marginLeft: 10,
    color: 'black',
  },
  avatarmenuIcon: {

  },
});
export default Avatardropmodal;
