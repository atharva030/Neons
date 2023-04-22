import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../Styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { Portal, Button, Modal, TextInput } from 'react-native-paper';
import styles1 from '../../Styles/AddTaskStyle';
const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, width: 340, marginLeft: 10, height: 320 };

const TaskItem = props => {
  const [statusColor, setStatusColor] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleDeleteClick = () => {
    // Implement delete functionality
  };

  const handleStatusUpdate = () => {
    // Implement status update functionality
  };

  const status = props.status;
  useEffect(() => {
    switch (status) {
      case "URGENT":
        setStatusColor('#FF0000');
        break;
      case "RUNNING":
        setStatusColor('#55d9a8');
        break;
      case "STOPPED":
        setStatusColor('#55d9a8');
        break;
      case "ONGOING":
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
          <View style={styles.iconStyle}>
            <TouchableOpacity>
              <Icon name="md-time-outline" size={15} color="grey" />
            </TouchableOpacity>
            <Text style={styles.taskText}>{props.time}</Text>
          </View>
          <View style={styles.iconStyle}>
            <TouchableOpacity>
              <Icon name="md-person" size={15} color="grey" />
            </TouchableOpacity>
            <Text style={styles.taskText}>{props.person} Persons</Text>
          </View>
        </View>
      </View>
      <Portal>
        <Modal visible={isModalVisible} onDismiss={handleModalClose} contentContainerStyle={containerStyle}>
          <View style={{ marginTop: 10 }}>
            <Text style={styles1.emaillabelStyle}>Edit Task Title</Text>
            <TextInput
              style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
              placeholder="Team Name"
              placeholderTextColor="#8d98b0"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles1.emaillabelStyle}>Edit Task Description</Text>
            <TextInput
              style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
              placeholder="Team Description"
              placeholderTextColor="#8d98b0"
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: 290, marginLeft: 15, marginTop: 25 }}>
            <Button icon="close" mode="contained" onPress={handleModalClose}>
              Close
            </Button>
            <Button icon="check" mode="contained" onPress={() => setIsModalVisible(false)} style={{ marginLeft: 5 }}>
              Done
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default TaskItem;
