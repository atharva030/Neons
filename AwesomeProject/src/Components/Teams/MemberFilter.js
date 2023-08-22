import {React, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Chip, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const MemberFilter = props => {
  
  const [userRole, setUserRole] = useState('');

  const getUserRole = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      console.log('this is from memberfilter screen ', userData);
      if (userData) {
        const {userRole} = JSON.parse(userData);
        setUserRole(userRole);
        console.log(userRole);
      }
    } catch (error) {
      console.log('Error while retrieving userRole from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    getUserRole();
  }, []);
  const deletExistTeamMember = async memberId => {
    // console.log(props.teamIdByItem,memberId)
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/team/${props.teamIdByItem}/deletemembers/${memberId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        props.fetchTeamMembers();
        props.fetchMembers();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    
    <View style={styles.chipWrapper}>
      <View style={styles.chip}>
        <View style={styles.container}>
          <Avatar.Image
            size={40}
            source={require('../../../assets/Image/profile1.png')}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{props.name}</Text>
            <Text style={styles.designationText}>{props.role}</Text>
          </View>

          {userRole == 'ROLE_ADMIN' ? (
            <TouchableOpacity
              style={{
                backgroundColor: '#1b1b1b',
                padding: 10,
                borderRadius: 40,
                borderWidth: 1,
                justifyContent: 'center',
                borderColor: '#F7DEE8',
              }}
              onPress={() =>
                Alert.alert(
                  'Confirmation',
                  'Are you sure you want to delete this team member?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: () => deletExistTeamMember(props.id),
                      style: 'destructive',
                    },
                  ],
                  {cancelable: false},
                )
              }>
              <Icon name="trash-outline" size={20} style={styles.deleteIcon} />
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  chipWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  chip: {
    borderWidth: 2,
    borderColor: '#351c4f',
    borderRadius: 20,
    marginTop: 20,
    width: 300,
    height: 75,
    backgroundColor: '#1b1b1b',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    // justifyContent: 'space-between',
    // paddingHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    // marginRight: 30, // Added marginRight to create spacing between image and text
  },
  textContainer: {
    marginLeft: 10,
    width: 180,
  },
  nameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: width * 0.039,
    color: 'white',
  },
  designationText: {
    fontFamily: 'Poppins-ExtraLight',
    fontSize: width * 0.032,
    color: 'white',
  },
  deleteIcon: {
    color: '#F7DEE8',
  },
});

export default MemberFilter;
