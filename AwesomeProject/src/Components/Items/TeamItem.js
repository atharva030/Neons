import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import styles from '../../Styles/Teamlist';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
const TeamItem = props => {
  const storeUserData = async (authToken, userRole) => {
    try {
      await AsyncStorage.setItem('auth-token', authToken);
      await AsyncStorage.setItem('userRole', userRole);
    } catch (error) {
      console.log('Error while storing user data in AsyncStorage:', error);
    }
  };
  const appFun = (id, teamTitle) => {
    // console.log(id)
    props.setteamId(id);
    props.navigation.navigate('TaskList', {
      post: id,
      teamTitle: teamTitle,
    });
  };
  const deleteId = id => {
    // console.log(id)
    props.setteamId(id);
    props.deleteTeam(id);
  };
  const handleModal = (title, desc, id) => {
    props.setteamId(id);
    props.openBottomSheet();
    props.setFormData({editTitle: title, editDesc: desc});
  };
  const MAX_TITLE_LENGTH = 18; // Set your desired character limit here

  // Truncate the title if it exceeds the character limit
  const truncatedTitle = props.title.length > MAX_TITLE_LENGTH
    ? `${props.title.slice(0, MAX_TITLE_LENGTH)}...`
    : props.title;
  status = props.status;
  return (
    <LinearGradient
      colors={['#140d13', '#0a1a1b']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={styles.teamFlex}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}></View>
        <View style={styles.mainSecondFlex}>
          <View style={styles.secondflex}>
            <View style={styles.secondSubFlex}>
              <Text style={styles.teamBigText}>{truncatedTitle}</Text>
              <TouchableOpacity>
                <Icon
                  name="arrow-forward-outline"
                  onPress={() => appFun(props.items._id, props.title)}
                  size={20}
                  color="white"
                  style={styles.forwardArrow}

                />
              </TouchableOpacity>
            </View>
            <Text style={styles.taskText}>{props.desc}</Text>
          </View>
          <View style={styles.flexIcon}>
            {/* <View style={styles.iconStyle}> */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <Icon name="people" size={18} color="#F7DEE8" />
              </TouchableOpacity>
              <Text style={styles.personText}>{props.person} Persons</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              {props.userRole == 'ROLE_ADMIN' ? (
                <TouchableOpacity
                  onPress={() =>
                    handleModal(props.title, props.desc, props.items._id)
                  }>
                  <Icon
                    name="md-pencil-outline"
                    size={20}
                    style={{color: '#F7DEE8', marginRight: 15}}
                  />
                </TouchableOpacity>
              ) : (
                ''
              )}

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Confirmation',
                    'Are you sure you want to delete team Permanantly?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => deleteId(props.items._id),
                        style: 'destructive',
                      },
                    ],
                    {cancelable: false},
                  )
                }>
                <Icon name="md-trash" size={20} style={{color: '#B20642'}} />
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default TeamItem;
