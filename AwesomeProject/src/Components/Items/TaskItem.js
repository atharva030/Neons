import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Portal, Button, Modal, TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';
import ToastComponent from '../Toast/toast';
import styles from '../../Styles/Home';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {Animated, Easing} from 'react-native';
import {Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';
import LinearGradient from 'react-native-linear-gradient';
const handleBackendError = () => {
  ToastComponent({message: '⚠️ Please Try again later!'});
};
const containerStyle = {
  backgroundColor: '#1b1b1b',
  padding: 20,
  borderRadius: 20,
  width: 340,
  marginLeft: 10,
  height: 320,
};

const totalSubtasks = 10;
const completedSubtasks = 1;
const subtaskProgress = completedSubtasks / totalSubtasks;

const data = [
  {label: 'Select Subtask', value: '0'},
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {label: '10', value: '10'},
];

const TaskItem = props => {
  const status = props.status;

  const [statusColor, setStatusColor] = useState('');
  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('0');
  const [textInputCount, setTextInputCount] = useState(0);
  const [isExtended, setIsExtended] = useState(false);
  const [fetchsubtask, setFetchSubtask] = useState([]);
  const [subtaskValues, setSubtaskValues] = useState([]);
  const [taskIdbyItem, settaskIdbyItem] = useState('');
  const [taskFlexHeight, setTaskFlexHeight] = useState(200);
  const [subtaskStatus, setSubtaskStatus] = useState({});
  const [modalHeight, setModalHeight] = useState(320); // Initial base height
  const [userRole, setUserRole] = useState('');
  // userRole==='ROLE_ADMIN'
  const getUserRole = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        const {userRole, userName, authToken, userDes} = JSON.parse(userData);
        setUserRole(userRole);
        // Call fetchTeam() here after setting the authToken
        // fetchTeam();
      }
    } catch (error) {
      console.log('Error while retrieving userRole from AsyncStorage:', error);
    }
  };
  useEffect(() => {
    getUserRole();
  }, []);
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
      // ToastComponent({message: 'SubTask Added Sucessfully'});
    } catch (error) {
      console.log(error);
      handleBackendError();
    }
  };
  const handleToggleFlex = taskId => {
    setIsExtended(!isExtended);
    fetchSubtask(props.teamIdByItem, taskId);

    // Get the count of subtasks fetched
    const subtaskCount = fetchsubtask.length;

    // Calculate the height for the modal container
    const modalHeight = calculateModalHeight(subtaskCount);

    // Set the height of the modal container
    setModalHeight(modalHeight);
  };

  const handleSubmitModal = () => {
    const formattedSubtasks = subtaskValues.map(value => ({title: value}));
    const payload = {subTasks: formattedSubtasks};
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
          style={[
            styles.textInputStyle,
            {
              color: 'white',
              backgroundColor: '#1b1b1b',
              borderBottomWidth: 2,
              borderBottomColor: '#6DED65',
            },
          ]}
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
    settaskIdbyItem(taskid);
  };

  const handleEditClick = (id, title, desc, endDate) => {
    props.openBottomEditSheet();
    props.setIsModalVisible(true);
    props.settaskId(id);
    // props.handleEditClick()
    props.setFormData({editTitle: title, editDesc: desc, endDate: endDate});
  };

  const handleChangeVariable = async (teamId, taskId, subtaskId) => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/team/${teamId}/tasks/${taskId}/subtasks/${subtaskId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const text = await response.text();
      // console.log('Response body text:', text); // Log the response body for debugging

      updateTaskStatus(teamId, taskId);
      try {
        const data = JSON.parse(text);
        // console.log(data);

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
    // console.log(subtaskId);
    // console.log(props.teamIdByItem);
    // console.log(taskIdByItem);
    handleChangeVariable(props.teamIdByItem, taskIdByItem, subtaskId);
    setSubtaskStatus(prevState => ({
      // ...prevState,
      // [subtaskId]: {
      //   ...prevState[subtaskId],
      //   isChecked: !prevState[subtaskId]?.isChecked,
      // },
    }));
  };

  const isChecked = subtaskId => {
    const subtask = subtaskStatus[subtaskId];
    return subtask && subtask.isChecked;
  };
  // upload a file to cloudinary

  const handleUpload = async (teamIdByItem, taskIdbyItem, subtask) => {
    teamId = teamIdByItem;
    taskId = taskIdbyItem;
    subtaskId = subtask;
    console.log(teamId, taskId, subtaskId);
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (file) {
        const data = new FormData();
        data.append('file', {
          uri: file[0].uri,
          name: file[0].name,
          type: file[0].type,
        });
        // data.append('teamId', teamIdByItem);
        // data.append('taskId', taskIdbyItem);
        // data.append('subtaskId', subtask);

        try {
          console.log(data);
          // console.log(`https://tsk-final-backend.vercel.app/api/fileupload/${teamId}/tasks/${taskId}/subtasks/${subtaskId}/upload`)
          // console.log('Sending API request...');
          const response = await fetch(
            `https://tsk-final-backend.vercel.app/api/fileupload/${teamId}/tasks/${taskId}/subtasks/${subtaskId}/upload`,
            {
              method: 'PATCH',
              body: data,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          ).then(response => response.json());
          // console.log('Response:', response);
          // console.log('API request completed.');
        } catch (err) {
          console.log('Error:', err.message);
        }
      } else {
        console.log('No file selected.');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(
          'User cancelled the picker, exit any dialogs or menus and move on',
        );
      } else {
        throw err;
      }
    }
  };

  // get image
  const [imageUrl, setImageUrl] = useState('');
  const getImage = async (teamIdByItem, taskIdbyItem, subtask) => {
    teamId = teamIdByItem;
    taskId = taskIdbyItem;
    subtaskId = subtask;
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/fileupload/${teamId}/tasks/${taskId}/subtasks/${subtaskId}/image`,
        {
          method: 'GET',
        },
      );
      const uri = await response.json();
      setImageUrl(uri.url);
      // console.log(imageUrl);
      if (uri.url == null) {
        ToastComponent({message: 'No Image Found'});
      }
    } catch (error) {
      console.log(error);
      Alert.alert('No Image found');
      console.log('No Image Found');
    }
  };
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const handleImageModalOpen = (teamIdByItem, taskIdbyItem, subtask) => {
    setIsImageModalVisible(true);
    getImage(teamIdByItem, taskIdbyItem, subtask); // Fetch the image for the selected subtask
    // setGetupimage(data); // No need to set getupimage here; it will be set inside the getImage function
  };
  const handleImageModalClose = () => {
    setIsImageModalVisible(false);
  };
  // Image Modal
  const ImageModal = () => {
    // If the imageUrl is empty, don't show the modal content
    if (!imageUrl) {
      // ToastComponent({message: 'No Image Found'});
      return null;
    }

    return (
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        onRequestClose={handleImageModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Show the image if imageUrl is not empty */}
            {imageUrl ? (
              <Image
                source={{uri: imageUrl}} // Use the fetched image URL
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              />
            ) : null}
            <TouchableOpacity
              onPress={handleImageModalClose}
              style={styles.closeIcon}>
              <Icon
                name="close"
                size={50}
                color="white"
                style={[
                  {
                    backgroundColor: 'black',
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  // delete task
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
      data.forEach(subtask => {
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
  const updateTaskStatus = async (teamId, taskId) => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/task/${teamId}/updatestatus/${taskId}`,
        {
          method: 'PATCH',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateProgress = async (teamId, taskId, subtaskProgress) => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/task/${teamId}/updateProgress/${taskId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Progress: subtaskProgress}),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update task Progress');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calculateProgress = fetchsubtask => {
    try {
      const completedSubtasks = fetchsubtask.filter(
        subtask => subtask.uploaded === true,
      ).length;
      const totalSubtasks = fetchsubtask.length;
      const progress =
        totalSubtasks > 0 ? completedSubtasks / totalSubtasks : 0;
      setSubtaskProgress(progress);
      updateProgress(props.teamIdByItem, props.id, subtaskProgress);
      // console.log(props.teamIdByItem,props.id,subtaskProgress);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownChange = value => {
    setSelectedOption(value);
    setTextInputCount(Number(value));
  };

  // ...

  const renderPickerItems = () => {
    return data.map(item => (
      <Picker.Item
        key={item.value}
        label={item.label}
        value={item.value}
        style={{color: 'white', backgroundColor: '#1b1b1b', fontSize: 16}}
      />
    ));
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
      case 'UPCOMING':
        setStatusColor('#ff0096');
        break;
      default:
        break;
    }
    const subtaskCount = fetchsubtask.length;
    const newHeight = isExtended ? 180 + subtaskCount * 70 : 200;
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
  const calculateModalHeight = subtaskCount => {
    // Calculate the desired height based on the number of subtasks
    const baseHeight = 320; // The initial base height
    const additionalHeightPerSubtask = 70; // Height for each additional subtask
    return baseHeight + subtaskCount * additionalHeightPerSubtask;
  };

  return (
    <View style={[styles.taskFlex, {height: taskFlexHeight}]}>
      <LinearGradient
        colors={['#140d13', '#0a1a1b']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: statusColor || 'white', padding: 10}}>
              {props.status}
            </Text>

            <View style={{flexDirection: 'row'}}>
              {/* expanding panel for the  three dot icon  whn pressed it iwill grow and show the three icons which  will perform the crud operation for subtask  */}
              {props.userRole == 'ROLE_ADMIN' ? (
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
                                color="#835d3c"
                                size={20}
                                style={{marginRight: 10}}
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
                              color="white"
                              size={20}
                              style={{marginRight: 10}}
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
                                    onPress: () =>
                                      handleDeleteClick(
                                        props.id,
                                        props.teamIdByItem,
                                      ),
                                    style: 'destructive',
                                  },
                                ],
                                {cancelable: false},
                              )
                            }>
                            <Icon
                              name="trash"
                              color="white"
                              size={20}
                              style={{marginRight: 10}}
                            />
                          </TouchableOpacity>
                        </Animated.View>
                      )}
                      <Icon
                        name="ellipsis-vertical"
                        color="black"
                        size={20}
                        style={{
                          marginRight: 6,
                          padding: 5,
                          borderRadius: 6,
                          alignItems: 'center',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                ''
              )}
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
                <Icon name="md-time-outline" size={15} color="#20471E" />
              </TouchableOpacity>
              <Text style={styles.taskText}>{props.time}</Text>
            </View>
          </View>
          <Portal>
            <Modal
              visible={isModal1Visible}
              onDismiss={() => setIsModal1Visible(false)}
              contentContainerStyle={[containerStyle, {height: modalHeight}]}>
              <View style={styles.container}>
                <ScrollView>
                  <View
                    style={[
                      styles.dropdown, // Add your custom styles here
                      isExtended && {borderColor: '#6DED65'}, // Add border color when extended
                    ]}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      Please select the number of Subtask
                    </Text>
                    <Picker
                      selectedValue={selectedOption}
                      onValueChange={handleDropdownChange}
                      style={[
                        styles.pickerStyle,
                        isExtended && {borderColor: '#6DED65'},
                      ]}>
                      {renderPickerItems()}
                    </Picker>
                  </View>
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
                  style={{
                    backgroundColor: '#1b1b1b',
                    borderWidth: 2,
                    borderColor: '#6DED65',
                  }}
                  onPress={() => setIsModal1Visible(false)}>
                  Close
                </Button>
                <Button
                  icon="check"
                  mode="contained"
                  onPress={() => {
                    Alert.alert(
                      'Once addition!!!!',
                      'Are you sure you want to add Subtasks? You can only add the subtask for once',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Add',
                          onPress: handleSubmitModal,
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
                  style={{
                    marginLeft: 5,
                    backgroundColor: '#1b1b1b',
                    borderWidth: 2,
                    borderColor: '#6DED65',
                  }}>
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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 12,
                      }}>
                      <Icon name="chevron-up-outline" color="black" size={20} />
                      <Text style={styles.taskText}> See less</Text>
                    </View>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 14,
                      }}>
                      <Icon
                        name="chevron-down-outline"
                        color="black"
                        size={20}
                      />
                      <Text style={styles.taskText}>See Subtasks</Text>
                    </View>
                  </React.Fragment>
                )}
              </TouchableOpacity>
            </View>

            <ProgressBar progress={subtaskProgress} color={MD3Colors.error50} />
            <Collapsible collapsed={!isExtended} style={{color: 'black'}}>
              <View style={styles.additionalContent}>
                <View style={styles.subtaskBlockView}>
                  {fetchsubtask.length === 0 ? (
                    <Text style={{color: 'white'}}>
                      You don't have subtask to show
                    </Text>
                  ) : (
                    // <Text style={styles.subtaskTitle}>Subtasks</Text>
                    fetchsubtask.map(subtask => (
                      // console.log(subtask._id),
                      // console.log(props.teamIdByItem, props.id,subtask._id),
                      <View
                        key={subtask._id}
                        style={[
                          styles.individualSubT,
                          {flexDirection: 'row', alignItems: 'center'},
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
                                  onPress: () =>
                                    toggleCheckbox(subtask._id, props.id),
                                  // onPress: () => { selectFile(subtask._id, props.id) },
                                },
                              ],
                              {cancelable: false},
                            );
                          }}>
                          <Icon
                            name={
                              isChecked(subtask._id)
                                ? 'md-checkbox'
                                : 'md-checkbox-outline'
                            }
                            size={30}
                            color={
                              isChecked(subtask._id) ? '#418E3C' : '#8d98b0'
                            }
                          />
                        </TouchableOpacity>
                        <Text style={styles.subTTitle}>{subtask.title}</Text>
                        {userRole === 'ROLE_ADMIN' ? (
                          // If the user is an admin, show the eye button
                          <TouchableOpacity
                            style={[
                              styles.uploadButton,
                              {
                                backgroundColor: 'lightgrey',
                              },
                            ]}>
                            <Icon
                              name="eye"
                              color={'black'}
                              size={24}
                              onPress={() =>
                                handleImageModalOpen(
                                  props.teamIdByItem,
                                  props.id,
                                  subtask._id,
                                )
                              }
                            />
                          </TouchableOpacity>
                        ) : (
                          // If the user is not an admin, show the upload button
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
                            onPress={() =>
                              handleUpload(
                                props.teamIdByItem,
                                props.id,
                                subtask._id,
                              )
                            }>
                            <Text
                              style={[
                                styles.uploadbtnTxt,
                                {
                                  color: isChecked(subtask._id)
                                    ? 'grey'
                                    : '#fff',
                                },
                              ]}>
                              Upload
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  )}
                </View>
              </View>
            </Collapsible>
          </View>
          <ImageModal />
        </View>
      </LinearGradient>
    </View>
  );
};

export default TaskItem;
