import React from 'react';
import { View, Image,Text,TouchableOpacity } from 'react-native';
import profile from '../../../assets/Image/profile.jpg'
import styles from '../../Styles/AddTaskStyle'

const Avatar = ({ text="Atharva", size=50 }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <TouchableOpacity>
    <View style={{flexDirection:'column',alignItems:'center',marginRight:9,marginTop:10}}>
      <Image source={profile} style={avatarStyle} />
      <Text style={styles.avatarText}>{text}</Text>
    </View>
    </TouchableOpacity>
  );
};

export default Avatar;