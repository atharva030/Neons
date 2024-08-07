import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import styles from '../Styles/Home';
import BottomSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import Calendarstrip from '../Components/Calender/Calender';
import TaskItem from '../Components/Items/TaskItem';
import {Modal, Button} from 'react-native-paper';
import {FAB, Provider, DefaultTheme, Portal} from 'react-native-paper';
import AddTask from './AddTask';
import TeamMember from '../Components/Teams/TeamMember';
import styles1 from '../Styles/TasklistStyle';
import ToastComponent from '../Components/Toast/toast';
import CircularProgressBar from '../Components/CircularProgressBar';
// import Spinner from './Spinner';
import AppLoader from '../Components/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
const {Dimensions} = require('react-native');
import LinearGradient from 'react-native-linear-gradient';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import MemberFilter from '../Components/Teams/MemberFilter';
import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
const handleSuccess = () => {
  //ToastComponent({message: 'Task Updated Sucessfull'});
};

const handleBackendError = () => {
  ToastComponent({message: '⚠️ Please Try again later!'});
};
const currentDate = moment().format('MMMM DD, YYYY');

const TaskList = ({navigation, route}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [memberTeam, setmemberTeam] = useState(false);
  const [formData, setFormData] = useState({
    editTitle: '',
    editDesc: '',
    endDate: '',
  });
  const [resultTeamMemberData, setresultTeamMemberData] = useState('');
  const [fetchTask, setfetchTask] = useState([]);
  const [teamMembers, setteamMembers] = useState('');
  const [taskId, settaskId] = useState('');
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({open: false});
  const [refreshing, setRefreshing] = useState(false);
  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  const teamIdByItem = route.params.post; //id by teamItem
  const teamTitle = route.params.teamTitle; //id by teamItem
  const [isLoading, setIsLoading] = useState(false);
  const [filterMember, setFilterMember] = useState([]);
  const [uploaded, setUploaded] = useState('');
  var sum = 0;
  var subtaskLength = 0;
  var totalSubtasks = 0;
  var taskLength = null;
  var totalProgress1 = 0;
  const [totalProgress, setTotalProgress] = useState(0);
  const openeditBottomSheet = () => {
    bottomSheetTeamRef.current.open();
  };

  const closeeditBottomSheet = () => {
    bottomSheetTeamRef.current.close();
  };
  const showModal = () => {
    // console.log('preesed');
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerMemberStyle = {
    backgroundColor: 'black',
    marginHorizontal: 20,
    padding: 20,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  };
  const containerStyle = {
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.46,
    // borderWidth: 1,
    // borderColor: 'black',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: (deviceHeight - deviceHeight * 0.65) / 2,
    left: (deviceWidth - deviceWidth * 0.85) / 2,
  };

  const addtaskcontainerStyle = {
    width: deviceWidth * 0.95,
    height: deviceHeight * 0.62,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: (deviceHeight - deviceHeight * 0.65) / 2,
    left: (deviceWidth - deviceWidth * 0.85) / 5,
  };

  const handleSubmit = () => {
    setmemberTeam(false);
    hideModal();
    handleAddMember();
  };
  const handleEditClick = () => {
    setIsModalVisible(true);
  };
  const bottomSheetTeamRef = useRef(null);
  const bottomSheetEditRef = useRef(null);

  const openBottomTeamSheet = () => {
    bottomSheetTeamRef.current.open();
  };
  const openBottomEditSheet = () => {
    bottomSheetEditRef.current.open();
  };
  const closeBottomEditSheet = () => {
    bottomSheetEditRef.current.close();
  };

  const editTask = async (teamId, taskId) => {
    setIsModalVisible(false);
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/task/${teamId}/updatetask/${taskId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskName: formData.editTitle,
            taskDesc: formData.editDesc,
            endDate: formData.endDate,
          }),
        },
      );

      if (response.ok) {
        closeBottomEditSheet();
        fetchTasks();
        // ToastComponent({message: 'Task Edited successfully!'});
      } else {
        handleBackendError();
      }
    } catch (error) {
      console.log(error);
      handleBackendError();
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    // console.log(isLoading);
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/task/${teamIdByItem}/fetchtasks`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setfetchTask(data.tasks);
      setIsLoading(false);
      //ToastComponent({message: 'Task Fetched !'});
      setTimeout(() => {
        setRefreshing(false);
        // console.log('after', refreshing);
      }, 1200);
    } catch (error) {
      console.log(error);
      handleBackendError();
    }
  };
  const refreshfetchTasks = async () => {
    setRefreshing(true);
    await fetchTasks();
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/members/getuser/${teamIdByItem}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data);
      setresultTeamMemberData(data);
    } catch (error) {
      console.log(error);
      handleBackendError();
    }
  };

  const fetchTeamMembers = async () => {
    openBottomTeamSheet();
    fetch(
      `https://tsk-final-backend.vercel.app/api/team/${teamIdByItem}/getmembers`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log('This is fetched data', data);
        setFilterMember(data);
      })

      .catch(err => {
        console.log(err);
        handleBackendError();
      });
  };

  const deleteTask = async (teamId, taskId) => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/task/${teamId}/deletetask/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        // console.log(`Team with ID ${teamId} deleted successfully`);
        // fetchTasks();
        ToastComponent({message: 'Team Deleted successfully'});
      } else {
        // console.log(`Error deleting team with ID ${teamId}`);
      }
    } catch (error) {
      console.log(error);
      handleBackendError();
    }
  };
  const handleAddMember = async () => {
    console.log('This is selected IDS', selectedIds);
    fetch(`https://tsk-final-backend.vercel.app/api/team/${teamIdByItem}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedIds: selectedIds,
      }),
    })
      .then(response => {
        // console.log(selectedIds);
        // console.log('Response status code:', response);
        return response.text();
      })
      .then(text => {
        // console.log('Response body text:', text);
        try {
          const data = JSON.parse(text);
          // console.log('This is parse data', data);
        } catch (err) {
          console.log('Error parsing JSON:', err.message);
        }
      })
      //.then(ToastComponent({message: 'Members added sucessfully '}))
      .catch(err => {
        console.log('Error: ' + err.message);
        handleBackendError();
      });
  };

  useEffect(() => {
    // fetchData()
    fetchMembers();
    fetchTasks();
  }, []);
  const [userRole, setUserRole] = useState('');
  const count = 1;
  useEffect(() => {
    // Retrieve the userRole from AsyncStorage and update the state
    const getUserRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const {userRole} = JSON.parse(userData);
          setUserRole(userRole);
        }
      } catch (error) {
        console.log(
          'Error while retrieving userRole from AsyncStorage:',
          error,
        );
      }
    };
    getUserRole();
  }, [count]);
  useEffect(() => {
    let sum = 0;
    let count = 0;
    let completedSubtask = 0;
    let totalSubtasks = 0;
    let taskLength = fetchTask.length;
    //console.log('tasks ' ,taskLength);

    fetchTask.forEach(item => {
      totalSubtasks += item.subTask.length;
      // console.log('task subtask length ', item.subTask.length);
      // console.log('task progress ', item.Progress);

      completedSubtask += Math.round(item.Progress * item.subTask.length);
      console.log(
        'task completed ',
        Math.round(item.Progress * item.subTask.length),
      );
      sum += item.Progress;

      // console.log(totalSubtasks);
      // console.log(completedSubtask);
    });

    const totalProgress = Math.round((completedSubtask / totalSubtasks) * 100);
    // console.log(totalProgress);
    setTotalProgress(totalProgress);
  }, [fetchTask]);

  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(3, 'days'),
    },
  ];
  // let datesBlacklist = [ moment().add(1, 'days') ]; // 1 day disabled
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Provider
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, accent: 'transparent'},
      }}>
      <View style={styles.bottomContainer}>
        <BottomSheet
          ref={bottomSheetTeamRef}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: styles.bottomSheetWrapper,
            draggableIcon: styles.bottomSheetDraggableIcon,
            container: styles.bottomSheetContainer,
          }}>
          <View style={[styles.bottomSheetContent]}>
            <ScrollView>
              {filterMember.length === 0 ? (
                <View>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 20,
                      padding: 20,
                      marginTop: 140,
                      textAlign: 'center',
                      letterSpacing: 1.5,
                    }}>
                    You don't have Team Members to Display
                  </Text>
                </View>
              ) : (
                filterMember.map(items => (
                  <MemberFilter
                    key={items._id}
                    role={items.role}
                    id={items._id}
                    name={items.name}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    fetchTeamMembers={fetchTeamMembers}
                    fetchMembers={fetchMembers}
                    teamIdByItem={teamIdByItem}
                  />
                ))
              )}
            </ScrollView>
            {/* <TouchableOpacity style={styles.closeButton} onPress={closeBottomSheet}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
          </View>
        </BottomSheet>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshfetchTasks}
          />
        }>
        {/* Edit Task Modal Starts */}
        <RBSheet
          ref={bottomSheetEditRef}
          height={300} // Set the desired height of the bottom sheet
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            container: {
              borderTopColor: 'white',
              backgroundColor: 'black',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop: 30,
              height: 300,
            },
            draggableIcon: {
              backgroundColor: 'white',
            },
          }}>
          <View style={{marginLeft: 10}}>
            <Text style={styles1.emaillabelStyle}>Edit Task Title</Text>
            <TextInput
              style={[
                styles1.Emailinput,
                {backgroundColor: 'transparent', height: 40},
              ]}
              placeholder="Team Name"
              placeholderTextColor="white"
              value={formData.editTitle}
              onChangeText={value =>
                setFormData({...formData, editTitle: value})
              }
            />

            <Text style={styles1.emaillabelStyle}>Edit Task Description</Text>
            <TextInput
              style={[
                styles1.Emailinput,
                {backgroundColor: 'transparent', height: 40},
              ]}
              placeholder="Team Description"
              placeholderTextColor="white"
              value={formData.editDesc}
              onChangeText={value =>
                setFormData({...formData, editDesc: value})
              }
            />
            <View>
              <Text style={styles1.emaillabelStyle}>Edit End Date</Text>
              <TextInput
                style={[
                  styles1.Emailinput,
                  {backgroundColor: 'transparent', height: 40},
                ]}
                placeholder="Team Enddate"
                placeholderTextColor="white"
                value={formData.endDate}
                onChangeText={value =>
                  setFormData({...formData, endDate: value})
                }
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: 290,
                marginLeft: 15,
              }}>
              <Button
                icon="close"
                mode="contained"
                textColor="black"
                style={{backgroundColor: '#351c4f'}}
                onPress={closeeditBottomSheet}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Close
                </Text>
              </Button>
              <Button
                icon="check"
                mode="contained"
                textColor="black"
                onPress={() => {
                  Alert.alert(
                    'Confirmation',
                    'Are you sure you want to Edit the Task?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => editTask(teamIdByItem, taskId), // Wrap the function call inside an arrow function
                      },
                    ],
                    {cancelable: false},
                  );
                }}
                style={{marginLeft: 5, backgroundColor: '#351c4f'}}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Done
                </Text>
              </Button>
            </View>
          </View>
        </RBSheet>
        {/* Edit Task Modal Ends */}
        {/* Listing to add team members starts */}
        <Portal>
          <Modal
            visible={memberTeam}
            onDismiss={() => setmemberTeam(false)}
            contentContainerStyle={containerMemberStyle}>
            <Text style={{color: '#9E9E9E', fontSize: 15}}>
              Tap to select/deselect the members
            </Text>
            <ScrollView style={{maxHeight: 400}}>
              {resultTeamMemberData.length === 0 ? (
                <View>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 20,
                      padding: 20,
                      textAlign: 'center',
                      letterSpacing: 1.5,
                    }}>
                    Team members are already added.
                  </Text>
                </View>
              ) : (
                resultTeamMemberData.map(items => (
                  <TeamMember
                    key={items._id}
                    designation={items.designation}
                    id={items._id}
                    name={items.name}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                ))
              )}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 10,
              }}>
              <Button
                icon="close"
                mode="contained"
                onPress={() => setmemberTeam(false)}
                style={{marginRight: 10, backgroundColor: '#351c4f'}}>
                Close
              </Button>
              <Button
                icon="check"
                mode="contained"
                onPress={() => {
                  Alert.alert(
                    'Confirmation',
                    'Are you sure you want to add the selected members?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Add',
                        onPress: handleSubmit,
                      },
                    ],
                    {cancelable: false},
                  );
                }}
                disabled={resultTeamMemberData.length === 0}>
                Add Member
              </Button>
            </View>
          </Modal>
        </Portal>

        {/* Listing to add team members end */}
        {/* Add task Modal start */}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={addtaskcontainerStyle}>
            <AddTask hideAddModal={hideModal} teamIdByItem={teamIdByItem} />
          </Modal>
        </Portal>
        {/* Add task Modal end */}

        <ScrollView>
          <View style={[styles.fullscreen]}>
            <LinearGradient
              colors={['#140d13', '#0a1a1b']} // Set your desired gradient colors
              start={{x: 0, y: 1}} // Adjust the start point as needed
              end={{x: 1, y: 0}} // Adjust the end point as needed
              style={{flex: 1}}>
              <View style={styles.outer}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View style={styles.titleContainer}>
                    <Text style={[styles.titleText]}>
                      {teamTitle.length > 12
                        ? `${teamTitle.slice(0, 12)}...`
                        : teamTitle}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={fetchTeamMembers}
                    // onPress={openBottomSheet}
                  >
                    <Text style={styles.addText}>View Team</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dayContainer}>
                  <View style={styles.innerdayContainer}>
                    <Text style={[styles.dateText]}>{currentDate}</Text>
                  </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#1b1b1b',
                      width: '50%',
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      Tasks Progress
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 34,
                        marginTop: 10,
                      }}>
                      <Icon name="square" color={'#351c4f'} size={14}></Icon>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          marginLeft: 5,
                          fontSize: 14,
                          color: 'white',
                        }}>
                        Completed
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 34,
                        marginTop: 5,
                      }}>
                      <Icon name="square" color={'#D0D2D7'} size={14}></Icon>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          marginLeft: 5,
                          fontSize: 14,
                          color: 'white',
                        }}>
                        Pending
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles1.pbView,
                      {width: '50%', justifyContent: 'center'},
                    ]}>
                    <View style={styles1.pbStyle}>
                      <CircularProgressBar
                        selectedValue={totalProgress}
                        maxValue={100}
                        radius={50}
                        backgroundColor="transparent"
                        activeStrokeColor="#351c4f"
                        withGradient
                      />
                    </View>
                  </View>
                </View>
              </View>
              <Calendarstrip />
              {isLoading ? (
                <AppLoader />
              ) : (
                <>
                  {fetchTask.length === 0 ? (
                    <View
                      style={{
                        width: '100%',
                        height: 500,
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'grey',
                          fontSize: 20,
                          padding: 20,
                          marginTop: 100,
                          textAlign: 'center',
                          letterSpacing: 1.5,
                        }}>
                        You don't have Tasks to Display
                      </Text>
                      {userRole == 'ROLE_ADMIN' ? (
                        <Button
                          icon="plus"
                          mode="contained"
                          onPress={() => showModal()}
                          style={{width: 150, backgroundColor: '#351c4f'}}>
                          Add Task
                        </Button>
                      ) : (
                        ''
                      )}
                    </View>
                  ) : (
                    fetchTask.map(items => {
                      {
                        /* console.log('Progress for Task:', items.taskName, items.Progress);
                    
                    subtaskLength = items.subTask.length;
                    {/* console.log(subtaskLength); */
                      }
                      {
                        /* totalProgress1 = calculateCirP(items.Progress , subtaskLength, fetchTask.length); */
                      }

                      return (
                        <TaskItem
                          key={items._id}
                          status={items.status}
                          handleEditClick={handleEditClick}
                          settaskId={settaskId}
                          setIsModalVisible={setIsModalVisible}
                          setFormData={setFormData}
                          id={items._id}
                          title={items.taskName}
                          desc={items.taskDesc}
                          time={items.endDate}
                          teamIdByItem={teamIdByItem}
                          deleteTask={deleteTask}
                          userRole={userRole}
                          openBottomEditSheet={openBottomEditSheet}
                        />
                      );
                    })
                  )}
                </>
              )}
            </LinearGradient>
          </View>
        </ScrollView>

        {userRole == 'ROLE_ADMIN' ? (
          <Portal>
            <FAB.Group
              open={open}
              visible
              backdropColor="rgba(1, 1, 1, 0.9)"
              color="#fff"
              fabStyle={{
                backgroundColor: '#0d181b',
                borderColor: '#272626',
                borderWidth: 1,
              }}
              icon={open ? 'chevron-down' : 'plus'}
              actions={[
                {
                  icon: 'plus',
                  label: 'Add Task',
                  textColor: '#1b1b1b',
                  labelTextColor: '#fff',
                  style: {
                    backgroundColor: '#0d181b',
                    borderColor: '#272626',
                    borderWidth: 1,
                  },
                  color: '#fff',
                  onPress: () => showModal(),
                },
                {
                  icon: 'account-multiple-plus',
                  label: 'Add Team Members',
                  labelTextColor: '#fff',
                  color: '#fff',
                  style: {
                    backgroundColor: '#0d181b',
                    borderColor: '#272626',
                    borderWidth: 1,
                  },
                  onPress: () => setmemberTeam(true),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
              overlayColor="transparent"
            />
          </Portal>
        ) : (
          ''
        )}
      </ScrollView>
    </Provider>
  );
};

export default TaskList;
