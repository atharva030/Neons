import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Chip, Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const MemberFilter = props => {
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
          <TouchableOpacity
            style={{
              backgroundColor: '#1b1b1b',
              padding: 10,
              borderRadius: 40,
              borderWidth: 1,
              borderColor: '#6DED65',
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
    borderColor: '#6DED65',
    borderRadius: 20,
    marginTop: 20,
    width: 280,
    height: 70,
    backgroundColor: '#1b1b1b',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Added paddingHorizontal to create spacing between image and text
  },
  avatar: {
    width: 40,
    height: 40,
    // marginRight: 30, // Added marginRight to create spacing between image and text
  },
  textContainer: {
    // justifyContent: 'center',
    // margin:20
  },
  nameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'white',
  },
  designationText: {
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 12,
    color: 'white',
  },
  deleteIcon: {
    color: '#6DED65',
  },
});

export default MemberFilter;
