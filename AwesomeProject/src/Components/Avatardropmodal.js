import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet ,Image} from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Teamlist';
import Icon from 'react-native-vector-icons/FontAwesome';

const Avatardropmodal = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log('presed')

  };
const toggleMenulogout =()=>{
    console.log('logut presed')
    setIsOpen(!isOpen);
    // logout logic .. @atharva dada 
}

const toggleMenuprofile =()=>{
    console.log('profile presed')
    setIsOpen(!isOpen);
    navigation.navigate('ProfileScreen')
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
            <Text style={avatarstyles.avatarmenuText}><Icon name="user" size={16} color="black"style={avatarstyles.avatarmenuIcon }/> Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={avatarstyles.avatarmenuItem} onPress={toggleMenulogout}>
            <Text style={avatarstyles.avatarmenuText}><Icon name="sign-out" size={16} color="black" style={avatarstyles.avatarmenuIcon }/>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const avatarstyles = StyleSheet.create({
  avatarmodalContainer: {
    marginTop:80,
    alignSelf: 'flex-end',
    backgroundColor:'white',
    width:110,
    height:100,
    borderRadius:10,
    gap:4,
    justifyContent:'center',
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
  },
  avatarmenuItem: {
    backgroundColor:'white',
    borderRadius:5,
    width:80,
    height:38,
    alignItems: 'center',
    justifyContent:'center',
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
