import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Chip, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const TeamMember = (props) => {
  const [isSelected, setIsSelected] = useState(false);
console.log(props.name)
  const handlePress = () => {
    if (!isSelected) {
      setIsSelected(true);
      handleSelect(props.id);
    } else {
      handleDeselect(props.id);
    }
  };

  const handleLongPress = () => {
    setIsSelected(true);
    handleSelect(props.id);
  };

  const handleSelect = (id) => {
    const newIds = [...props.selectedIds, id];
    console.log('Selected:', newIds);
    props.setSelectedIds(newIds);
  };

  const handleDeselect = (id) => {
    const newIds = props.selectedIds.filter((prevId) => prevId !== id);
    console.log('Deselected:', newIds);
    props.setSelectedIds(newIds);
  };

  return (
    <Chip
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[
        styles.chip,
        isSelected && styles.chipPressed,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.tickIconContainer}>
          <Icon
            name="checkmark"
            size={20}
            color="white"
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
            <Text style={styles.nameText}>{props.name}</Text>
            <Text style={styles.designationText}>{props.designation}</Text>
          </View>
        </View>
      </View>
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 20,
    marginTop: 10,
    width: 280, // Adjust the width as desired
  },
  chipPressed: {
    backgroundColor: '#ebdefa',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'grey',
    marginRight: 10,
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
