// import { View, Text, TouchableOpacity } from 'react-native';
// import React from 'react';
// import styles from '../../Styles/Home';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useState, useEffect } from 'react';
// import { Portal, Button, Modal, TextInput } from 'react-native-paper';
// import styles1 from '../../Styles/AddTaskStyle';
// const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, width: 340, marginLeft: 10, height: 320 };

// const TaskItem = props => {
//   const [statusColor, setStatusColor] = useState("");
//   // const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleModal = (title, desc, id, time) => {
//     props.settaskId(id)
//     props.handleEditClick()
//     props.setFormData({ editTitle: title, editDesc: desc, endDate: time });
//   }

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Portal, Button, Modal, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import ToastComponent from '../Toast/toast';
import styles from '../../Styles/Home';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import styles1, { error } from '../../Styles/AddTaskStyle';
const handleBackendError = () => {
  ToastComponent({ message: '⚠️ Please Try again later!' });
};
const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 20,
  width: 340,
  marginLeft: 10,
  height: 320,
};

const totalSubtasks = 10;
const completedSubtasks = 1
const subtaskProgress =  (completedSubtasks / totalSubtasks ) ;

// //length of the subtask fetched so that to increase the height of container
// const subtaskCount = fetchsubtask.length;

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

const TaskItem = props => {
  const status = props.status;
  const [statusColor, setStatusColor] = useState('');
  const [isModal1Visible, setIsModal1Visible] = useState(false);
  // const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('0');
  const [textInputCount, setTextInputCount] = useState(0);
  const [isExtended, setIsExtended] = useState(false);
  const [fetchsubtask, setFetchSubtask] = useState([]);
  const [subtaskValues, setSubtaskValues] = useState([]);
  const [taskIdbyItem, settaskIdbyItem] = useState('');
  const [checkboxState, setCheckboxState] = useState({});
  const [taskFlexHeight, setTaskFlexHeight] = useState(200);

  const addSubtask = async (teamIdByItem, taskIdByItem, payload) => {
    try {
      const response = await fetch(
        `http://192.168.29.161:8888/api/task/${teamIdByItem}/tasks/${taskIdByItem}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update subtasks');
      }
      ToastComponent({ message: 'SubTask Added Sucessfully' }) 
      console.log('This is response', response);
    } catch (error) {
      console.log(error);
      handleBackendError()
    }
  };

  const handleToggleFlex = taskId => {
    setIsExtended(!isExtended);
    // subtaskfetch();
    fetchSubtask(props.teamIdByItem, taskId)

  };

  const handleDropdownChange = value => {
    setSelectedOption(value);
    setTextInputCount(Number(value));

  };

  const handleSubmitModal = () => {
    const formattedSubtasks = subtaskValues.map(value => ({ title: value }));
    const payload = { subTasks: formattedSubtasks };
    addSubtask(props.teamIdByItem, taskIdbyItem, payload);
    setIsModal1Visible(false);
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtaskValues = [...subtaskValues];
    updatedSubtaskValues[index] = value;
    setSubtaskValues(updatedSubtaskValues);
  };

  const renderTextInputs = () => {
    const textInputs = [];

    for (let i = 0; i < textInputCount; i++) {
      textInputs.push(
        <TextInput
          style={styles.textInputStyle}
          key={i}
          placeholder={`SubTask ${i + 1}`}
          onChangeText={value => handleSubtaskChange(i, value)}
        />,
      );
    }
    return textInputs;
  };

  const handleAddSubTaskClick = taskid => {
    setIsModal1Visible(true);
    settaskIdbyItem(taskid)

  };

  const handleEditClick = (id, title, desc, endDate) => {
    props.setIsModalVisible(true);
    props.settaskId(id);
    // props.handleEditClick()
    props.setFormData({ editTitle: title, editDesc: desc, endDate: endDate });
  };

  //this is the function for subtask checkboxes and upload button

  const toggleCheckbox = subtaskId => {
    setCheckboxState(prevState => ({
      ...prevState,
      [subtaskId]: !prevState[subtaskId],
    }));
  };

  const isChecked = subtaskId => {
    return checkboxState[subtaskId] === true;
  };

  const handleDeleteClick = (taskId, teamId) => {
    props.deleteTask(teamId, taskId);
  };
  const fetchSubtask = async (teamId, taskId) => {
    try {
      const response = await fetch(
        `http://192.168.29.161:8888/api/task/${teamId}/fetchsubtasks/${taskId}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch subtasks');
      }
      ToastComponent({ message: 'SubTask Fetched Sucessfully' }) 
      const data = await response.json();
      setFetchSubtask(data);
      console.log(fetchsubtask);
    } catch (error) {
      console.log(error);
      handleBackendError()
    }
  };

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

    const subtaskCount = fetchsubtask.length;
    const newHeight = isExtended ? 220 + subtaskCount * 80 : 200;
    setTaskFlexHeight(newHeight);
  }, [status, isExtended, fetchsubtask]);

  return (
    <View style={[styles.taskFlex, { height: taskFlexHeight }]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{ color: statusColor, padding: 10 }}>{props.status}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleAddSubTaskClick(props.id)}>
            {fetchsubtask.length > 0 ? "" : 
            <Icon
              name="md-add"
              color="black"
              size={20}
              style={{ marginRight: 10 }}
            />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleEditClick(props.id, props.title, props.desc, props.time)
            }>
            <Icon
              name="md-pencil-sharp"
              color="grey"
              size={19}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteClick(props.id, props.teamIdByItem)}>
            <Icon
              name="md-trash"
              color="grey"
              size={20}
              style={{ marginRight: 10 }}
            />
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
          <TouchableOpacity>
            <Icon name="md-time-outline" size={15} color="grey" />
          </TouchableOpacity>
          <Text style={styles.taskText}>{props.time}</Text>
        </View>
      </View>

      <Portal>
        <Modal
          visible={isModal1Visible}
          onDismiss={() => setIsModal1Visible(false)}
          contentContainerStyle={containerStyle}>
          <View style={styles.container}>
            <ScrollView>
              {/* <Text style={[styles.label, isExtended && { color: 'blue' }]}>No. of Subtasks</Text> */}
              <Dropdown
                style={[styles.dropdown, isExtended && { borderColor: 'blue' }]}
                selectedValue={selectedOption}
                onValueChange={handleDropdownChange}
                placeholderStyle={[styles.placeholderStyle, { color: 'black' }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: 'black' }]}
                inputSearchStyle={[styles.inputSearchStyle, { color: 'black' }]}
                optionTextStyle={{ color: 'black' }}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isExtended ? 'Select No of subtasks' : '...'}
                searchPlaceholder="Search..."
                value={textInputCount.toString()}
                onFocus={() => setIsExtended(true)}
                onBlur={() => setIsExtended(false)}
                onChange={item => {
                  setTextInputCount(Number(item.value));
                  setIsExtended(false);
                }}
              />

              {/* Render TextInput components based on the selected option */}
              {renderTextInputs()}
            </ScrollView>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 290,
              marginLeft: 15,
              marginTop: 25,
            }}>
            <Button
              icon="close"
              mode="contained"
              onPress={() => setIsModal1Visible(false)}>
              Close
            </Button>
            <Button
              icon="check"
              mode="contained"
              onPress={handleSubmitModal}
              style={{ marginLeft: 5 }}>
              Done
            </Button>
          </View>
        </Modal>
      </Portal>

      <View>
        {/* Task content */}
        <View style={styles.taskContainer}>
          {/* Task */}
          <View style={styles.taskContent}>{/* Task details */}</View>

          {/* Toggle button */}

          <TouchableOpacity onPress={() => handleToggleFlex(props.id)}>
            {isExtended ? (
              <React.Fragment>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="chevron-up-outline" color="black" size={20} />
                  <Text style={styles.taskText}> See less</Text>
                </View>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="chevron-down-outline" color="black" size={20} />
                  <Text style={styles.taskText}>See Subtasks</Text>
                </View>
              </React.Fragment>
            )}
          </TouchableOpacity>
        </View>

        <ProgressBar progress={subtaskProgress} color={MD3Colors.error50} />
        <Collapsible collapsed={!isExtended} style={{ color: 'black' }}>
          <View style={styles.additionalContent}>
            <View style={styles.subtaskBlockView}>
              {fetchsubtask.length === 0 ? (<Text style={{ color: "black" }}>You don't have subtask to show</Text>
              ) :
                // <Text style={styles.subtaskTitle}>Subtasks</Text>
                fetchsubtask.map(subtask => (
                  
                  <View
                    key={subtask._id}
                    style={[styles.individualSubT, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TouchableOpacity
                      style={styles.subTaskSelectCheck}
                      onPress={
                        () => toggleCheckbox(subtask._id) // Pass the subtask ID to the toggleCheckbox function
                      }>
                      <Icon
                        name={
                          isChecked(subtask._id)
                            ? 'md-checkbox'
                            : 'md-checkbox-outline'
                        }
                        size={30}
                        color={isChecked(subtask._id) ? '#097969' : '#8d98b0'}
                      />
                    </TouchableOpacity>
                    <Text style={styles.subTTitle}>{subtask.title}</Text>
                    <TouchableOpacity
                      style={[
                        styles.uploadButton,
                        {
                          backgroundColor: isChecked(subtask._id)
                            ? '#00A36C'
                            : 'lightgrey',
                        },
                      ]}
                      disabled={!isChecked(subtask._id)}
                    //onPress={handleUpload}
                    >
                      <Text style={[styles.uploadbtnTxt, { color: isChecked(subtask._id) ? '#fff' : 'grey' }]}>Upload</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </View>
        </Collapsible>
      </View>
    </View>
  );
};

export default TaskItem;
