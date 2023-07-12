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
//import DocumentPicker from 'react-native-document-picker'
import ExpandingPanel from '../ExpandingPanel/ExpandingPanel';
import { Animated, Easing } from 'react-native';
import { Alert } from 'react-native';
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
const completedSubtasks = 1;
const subtaskProgress = completedSubtasks / totalSubtasks;

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
  const [subtaskStatus, setSubtaskStatus] = useState({});

  const addSubtask = async (teamIdByItem, taskIdByItem, payload) => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/task/${teamIdByItem}/tasks/${taskIdByItem}`,
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
      ToastComponent({ message: 'SubTask Added Sucessfully' });
      console.log('This is response', response);
    } catch (error) {
      console.log(error);
      handleBackendError();
    }
  };
  const handleToggleFlex = taskId => {
    setIsExtended(!isExtended);
    // subtaskfetch();
    fetchSubtask(props.teamIdByItem, taskId);
    // calculateProgress(fetchsubtask);
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
  // function for uploading files and opening the dialog box fro the same opening system file manager .
  // const handleUpload = () => {
  //   console.log('upload button clicked');
  //   DocumentPicker.pick({}).then(res => {});
  // };

  const handleAddSubTaskClick = taskid => {
    setIsModal1Visible(true);
    settaskIdbyItem(taskid);
  };

  const handleEditClick = (id, title, desc, endDate) => {
    props.setIsModalVisible(true);
    props.settaskId(id);
    // props.handleEditClick()
    props.setFormData({ editTitle: title, editDesc: desc, endDate: endDate });
  };

  //this is the function for subtask checkboxes and upload button

  // const toggleCheckbox = (subtaskId, taskIdByItem) => {
  //   console.log(subtaskId);
  //   console.log(props.teamIdByItem);
  //   console.log(taskIdByItem);
  //   setCheckboxState('aksndkajndk', prevState => ({
  //     ...prevState,
  //     [subtaskId]: !prevState[subtaskId],
  //   }));
  // };

  // const toggleCheckbox = (subtaskId, taskIdByItem) => {
  //   setSubtaskStatus(prevState => ({
  //     ...prevState,
  //     [subtaskId]: {
  //       isChecked: !prevState[subtaskId]?.isChecked,
  //       uploaded: prevState[subtaskId]?.uploaded || false,
  //     },
  //   }));
  // };
  const handleChangeVariable = async (teamId, taskId, subtaskId) => {
    try {
      const response = await fetch(`https://tsk-final-backend.vercel.app/api/team/${teamId}/tasks/${taskId}/subtasks/${subtaskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const text = await response.text();
      console.log('Response body text:', text); // Log the response body for debugging

      try {
        const data = JSON.parse(text);
        console.log(data);
        // Call any other functions or update the UI based on the response data
      } catch (err) {
        console.log('Error parsing JSON:', err.message);
      }

      // ToastComponent({ message: 'Members added successfully' });
    } catch (err) {
      console.log('Error:', err.message);
    }
  };


  const toggleCheckbox = (subtaskId, taskIdByItem) => {
    console.log(subtaskId);
    console.log(props.teamIdByItem);
    console.log(taskIdByItem);
    handleChangeVariable(props.teamIdByItem, taskIdByItem, subtaskId);
    setSubtaskStatus((prevState) => ({
      ...prevState,
      [subtaskId]: {
        ...prevState[subtaskId],
        isChecked: !prevState[subtaskId]?.isChecked,
      },
    }));
  };

  // const isChecked = subtaskId => {
  //   return ((checkboxState[subtaskId] === true) || (subtaskId.uploaded === true));
  // };
  // const isChecked = subtaskId => {
  //   const subtask = fetchsubtask.find(item => item._id === subtaskId);
  //   return subtask && subtask.uploaded;
  // };

  const isChecked = subtaskId => {
    const subtask = subtaskStatus[subtaskId];
    return subtask && subtask.isChecked;
  };

  const handleUpload = subtaskId => {
    setSubtaskStatus(prevState => ({
      ...prevState,
      [subtaskId]: {
        ...prevState[subtaskId],
        uploaded: true,
      },
    }));
  };

  const handleDeleteClick = (taskId, teamId) => {
    props.deleteTask(teamId, taskId);
  };

  const [subtaskProgress, setSubtaskProgress] = useState(0);

  //function to calculate subtask progress
  const fetchSubtask = async (teamId, taskId) => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/task/${teamId}/fetchsubtasks/${taskId}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch subtasks');
      }
      // ToastComponent({ message: 'SubTask Fetched Successfully' });
      const data = await response.json();
      // console.log(data)0
      setFetchSubtask(data);
      calculateProgress(data); // Pass the fetched data to the calculateProgress function

      const subtaskStatus = {};
      data.forEach((subtask) => {
        subtaskStatus[subtask._id] = {
          isChecked: subtask.uploaded,
          uploaded: subtask.uploaded,
        };
      });

      setSubtaskStatus(subtaskStatus);

    } catch (error) {
      console.log(error);
      handleBackendError();
    }
  };

  const calculateProgress = fetchsubtask => {
    try {
      // console.log("This is fetched subtask in calculatedprogress", fetchsubtask);
      const completedSubtasks = fetchsubtask.filter(
        subtask => subtask.uploaded === true,
      ).length;
      const totalSubtasks = fetchsubtask.length;
      // console.log("Completed true Subtask", completedSubtasks);
      // console.log("Completed all Subtask", totalSubtasks);
      const progress = completedSubtasks / totalSubtasks;
      setSubtaskProgress(progress);
    } catch (error) {
      console.log(error);
    }
  };

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

    const subtaskCount = fetchsubtask.length;
    const newHeight = isExtended ? 220 + subtaskCount * 80 : 200;
    setTaskFlexHeight(newHeight);

    fetchSubtask(props.teamIdByItem, props.id);

  }, [status, isExtended, fetchsubtask, props.teamIdByItem, props.id]);
  const [isExpanded, setIsExpanded] = useState(false);
  const panelWidth = useState(new Animated.Value(0))[0];

  const handleIconPress = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(panelWidth, {
      toValue: isExpanded ? 0 : 120,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const panelOpacity = panelWidth.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 1],
  });
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
          {/* expanding panel for the  three dot icon  whn pressed it iwill grow and show the three icons which  will perform the crud operation for subtask  */}
          <View>
            <TouchableOpacity onPress={handleIconPress}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                {isExpanded && (
                  <Animated.View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'pink',
                      padding: 5,
                      borderRadius: 5,
                      overflow: 'hidden',
                      opacity: panelOpacity,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleAddSubTaskClick(props.id)}>
                      {fetchsubtask.length > 0 ? (
                        ''
                      ) : (
                        <Icon
                          name="add"
                          color="black"
                          size={20}
                          style={{ marginRight: 10 }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleEditClick(
                          props.id,
                          props.title,
                          props.desc,
                          props.time,
                        )
                      }>
                      <Icon
                        name="pencil-sharp"
                        color="black"
                        size={20}
                        style={{ marginRight: 10 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
  onPress={() =>
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteClick(props.id, props.teamIdByItem),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    )
  }
>
  <Icon
    name="trash"
    color="black"
    size={20}
    style={{ marginRight: 10 }}
  />
</TouchableOpacity>
                  </Animated.View>
                )}
                <Icon
                  name="ellipsis-vertical"
                  color="grey"
                  size={20}
                  style={{
                    marginRight: 10,
                    backgroundColor: 'pink',
                    padding: 5,
                    borderRadius: 6,
                    alignItems: 'center',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
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
              {fetchsubtask.length === 0 ? (
                <Text style={{ color: 'black' }}>
                  You don't have subtask to show
                </Text>
              ) : (
                // <Text style={styles.subtaskTitle}>Subtasks</Text>
                fetchsubtask.map(subtask => (
                  <View
                    key={subtask._id}
                    style={[
                      styles.individualSubT,
                      { flexDirection: 'row', alignItems: 'center' },
                    ]}>
                    <TouchableOpacity
                      style={styles.subTaskSelectCheck}
                      onPress={() => {
                        Alert.alert(
                          'Confirmation',
                          'Are you sure to submit check the box?',
                          [
                            {
                              text: 'Cancel',
                              style: 'cancel',
                            },
                            {
                              text: 'Confirm',
                              onPress: () => toggleCheckbox(subtask._id, props.id),
                            },
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
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
                            ? 'lightgrey'
                            : '#00A36C',
                        },
                      ]}
                      disabled={isChecked(subtask._id)}
                      onPress={() => handleUpload(subtask._id)}>
                      <Text
                        style={[
                          styles.uploadbtnTxt,
                          {
                            color: isChecked(subtask._id) ? 'grey' : '#fff',
                          },
                        ]}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          </View>
        </Collapsible>
      </View>
    </View>
  );
};

export default TaskItem;
