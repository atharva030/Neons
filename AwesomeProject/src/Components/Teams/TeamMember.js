import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const TeamMember = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected((prevState) => !prevState);
    if (!isSelected) {
      handleSelect(props.id);
    } else {
      handleDeselect(props.id);
    }
  };

  const handleSelect = (id) => {
    props.setSelectedIds((prevIds) => [...prevIds, id]);
  };

  const handleDeselect = (id) => {
    props.setSelectedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
  };

  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipPressed]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* <View style={styles.container}> */}
        <View style={styles.tickIconContainer}>
          <Icon
            name="checkmark"
            size={20}
            color={isSelected ? 'green' : 'white'}
            style={isSelected ? styles.checkmarkSelected : styles.checkmarkNotSelected}
          />
        </View>
        <View style={styles.contentContainer}>
          <Avatar.Image
            size={40}
            source={require('../../../assets/Image/profile1.png')}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Atharva</Text>
            <Text style={styles.designationText}>{props.designation}</Text>
          </View>
        </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   chip: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 20,
    marginTop: 20,
    width: 270,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:"center"
  },
  chipPressed: {
    backgroundColor: '#ebdefa',
  },
  container: {
    
  },
  tickIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'grey',
    // marginRight: 5, // Adjust margin here
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkSelected: {
    backgroundColor: 'green',
    borderRadius: 50,
  },
  checkmarkNotSelected: {
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,

  },
  avatar: {
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'black',
  },
  designationText: {
    fontFamily: 'Poppins-ExtraLight',
    fontSize: 12,
    color: 'black',
  },
});

export default TeamMember;
