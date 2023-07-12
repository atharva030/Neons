import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Chip, Avatar } from 'react-native-paper';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ToastAndroid } from 'react-native';
const showSuccessToast = () => {
  ToastAndroid.showWithGravity('Task Addded Sucessfully ', ToastAndroid.SHORT, ToastAndroid.TOP);
};
const showBackendErrorToast = () => {
  { ToastAndroid.showWithGravity('Please Try again later !', ToastAndroid.SHORT, ToastAndroid.TOP) }
};
const TeamMember = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(props.selectedIds.includes(props.id));
  }, [props.selectedIds]);

  const handlePress = () => {
    if (!isSelected) {
      setIsSelected(true);
      handleSelect(props.id);
    } else {
      setIsSelected(false);
      handleDeselect(props.id);
    }
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
    <View style={styles.chipWrapper}>
      <Chip
        onPress={handlePress}
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
              <Text style={styles.nameText}>{props.name}</Text>
              <Text style={styles.designationText}>{props.designation}</Text>
            </View>
          </View>
        </View>
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  chipWrapper: { flexDirection: 'row',alignItems: 'center', },
  chip: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 20,
    marginTop: 20,
    width: 280,
    height: 70
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
