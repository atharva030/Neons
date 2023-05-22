import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../../Styles/Home';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState, useEffect} from 'react';
import {Portal, Button, Modal, TextInput, ScrollView} from 'react-native-paper';
import { Portal, Button, Modal, TextInput } from 'react-native-paper';
import styles from '../../Styles/Home';
import styles1 from '../../Styles/AddTaskStyle';


import {Dropdown} from 'react-native-element-dropdown';

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 20,
  width: 340,
  marginLeft: 10,
  height: 320,
};

const data = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
];
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 20,
  width: 340,
  marginLeft: 10,
  height: 320,
};


const data = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
];

const TaskItem = (props) => {
  const [statusColor, setStatusColor] = useState('');
  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('0');
  const [textInputCount, setTextInputCount] = useState(0);
  const [isExtended, setIsExtended] = useState(false);

  const renderLabel = () => {
    if (textInputCount || isExtended) {
      return (
        <Text style={[styles.label, isExtended && { color: 'blue' }]}>
          No. of Subtasks
        </Text>
      );
    }
    return null;
  };

  const handleToggleFlex = () => {
    setIsExtended(!isExtended);
  };

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    setTextInputCount(Number(value));
  };

const TaskItem = props => {
  const [statusColor, setStatusColor] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddSubTaskClick = () => {
    setIsModal1Visible(true);
  };

  const handleEditClick = () => {
    setIsModal2Visible(true);
  };

  const handleDeleteClick = (teamId, id) => {
    // Implement delete functionality
    console.log(id)
    props.settaskId(id)
    props.deleteTask(id,teamId )
  };

  const status = props.status;
  useEffect(() => {
    switch (status) {
      case 'URGENT':
        setStatusColor('#FF0000');
        break;
      case 'RUNNING':
        setStatusColor('#55d9a8');
        break;
      case 'STOPPED':
        setStatusColor('#55d9a8');
        break;
      case 'ONGOING':
        setStatusColor('#ff0096');
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <View style={styles.taskFlex}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: `${statusColor}`, padding: 10 }}>{props.status}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleEditClick}>
            <Icon name="md-pencil-sharp" color='grey' size={19} style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteClick}>
            <Icon name="md-trash-bin" color='grey' size={20} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.hairline} />
      <View style={styles.mainSecondFlex}>
        <View style={styles.secondflex}>
          <View style={styles.secondSubFlex}>
            <Text style={styles.taskBigText}>{props.title}</Text>
          </View>
          <Text style={styles.taskText}>{props.desc}</Text>
        </View>
        <View style={styles.flexIcon}>
          {/* <View style={styles.iconStyle}> */}
            <Text style={styles.taskText}>{props.time}</Text>
            <TouchableOpacity>
              <Icon name="md-time-outline" size={15} color="grey" />
            </TouchableOpacity>
          {/* </View> */}
       
        </View>
      </View>
      
    </View>
  );
};

export default TaskItem;
