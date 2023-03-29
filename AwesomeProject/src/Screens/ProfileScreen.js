import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import styles from '../Styles/ProfileStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';

const Profile = () => {
  return (
    <ScrollView>
      <View style={styles.Addfullscreen}>
        <View style={styles.ProfileSubscreen}>
          <View style={styles.leftIcon}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Icon name="chevron-back" size={30} color="white" />
              <Text style={styles.AddtitleText}>Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bellIcon}>
            <Icon name="notifications-outline" size={30} color="white" />
          </View>
        </View>
        <View style={styles.addSecondScreen}>
          <View style={styles.profileImage}>
            <Avatar.Image
              size={90}
              source={require('../../assets/Image/profile.jpg')}
            />
          </View>

          <View></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
