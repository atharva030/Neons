import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import styles from '../Styles/Teamlist';
import moment from 'moment';
import TeamItem from '../Components/Items/TeamItem';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FAB,
  Provider,
  DefaultTheme,
  Portal,
  Button,
  Modal,
  TextInput,
} from 'react-native-paper';
import styles1 from '../Styles/AddTaskStyle';
import ToastComponent from '../Components/Toast/toast';
import Avatardropmodal from '../Components/Avatardropmodal';
import AppLoader from '../Components/AppLoader';

const handleSuccess = () => {
  ToastComponent({message: 'Team Added successfully'});
};
const toggleMenulogout = async () => {
  setIsOpen(false);
  // Remove the auth-token from AsyncStorage
  try {
    await AsyncStorage.removeItem('auth-token');
    // console.log('auth-token removed from AsyncStorage');
  } catch (error) {
    console.log('Error while removing auth-token from AsyncStorage:', error);
  }
  // After removing the auth-token, navigate to the LoginScreen
  navigation.navigate('LoginScreen');
};
const handleBackendError = () => {
  ToastComponent({message: '⚠️ Please Try again later!'});
};
const currentDate = moment().format('MMMM DD, YYYY');

const HomeScreen = ({navigation}) => {
  const [teamName, setteamName] = useState('');
  const [teamDesc, setteamDesc] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [resultTeamData, setresultTeamData] = useState('');
  // const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({editTitle: '', editDesc: ''});
  const [teamId, setteamId] = useState('');
  const [isModalVisibleavatar, setIsModalVisibleavatar] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [isLoading, setIsLoading] = useState(' ');
  const bottomSheetRef = useRef(null);
  const [backButtonPressed, setBackButtonPressed] = useState(false);
  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
    setIsBottomSheetOpen(false);
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: 340,
    marginLeft: 10,
    height: 320,
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchTeam();
    setRefreshing(false);
  };
  const [userRole, setUserRole] = useState('');
  const [idName, setidName] = useState('');
  const [authenToken, setauthenToken] = useState('');
  const [userDes, setuserDes] = useState('');
  const getUserRole = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        const {userRole, userName, authToken, userDes} = JSON.parse(userData);
        setUserRole(userRole);
        setidName(userName);
        setauthenToken(authToken);
        setuserDes(userDes);
        // console.log("This is the one from homescreen",userRole,idName,authenToken,userDes)
        // Call fetchTeam() here after setting the authToken
        // fetchTeam();
      }
    } catch (error) {
      console.log('Error while retrieving userRole from AsyncStorage:', error);
    }
  };
  const removeUser = () => {
    setUserRole('');
    setidName('');
    setauthenToken('');
    setuserDes('');
  };
  useEffect(() => {
    getUserRole();
  }, []);

  useEffect(() => {
    // Call fetchTeam() whenever authenToken changes
    if (authenToken) {
      fetchTeam();
    }
  }, [authenToken]);

  useEffect(() => {
    const backAction = () => {
      if (backButtonPressed) {
        // If the back button is pressed twice within 2 seconds, exit the app
        BackHandler.exitApp();
        return true;
      } else {
        // Show a toast message on the first back button press
        ToastAndroid.show('Press back again to exit!', ToastAndroid.SHORT);
        setBackButtonPressed(true);
        // Reset the backButtonPressed state after 2 seconds
        setTimeout(() => {
          setBackButtonPressed(false);
        }, 2000);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [backButtonPressed]);
  // const FadeScreen = () => {
  //   const fadeAnim = useRef(new Animated.Value(1)).current;

  //   useEffect(() => {
  //     const fadeOut = () => {
  //       Animated.timing(fadeAnim, {
  //         toValue: 0,
  //         duration: 2000, // Duration in milliseconds
  //         useNativeDriver: true, // Enable native driver for performance
  //       }).start();
  //     };
  //   });
  //   const fadeOutTimeout = setTimeout(fadeOut, 5000);
  //   return (
  //     () => {
  //       clearTimeout(fadeOutTimeout);
  //     },
  //     [fadeAnim]
  //   );
  // };
  const addTeam = async () => {
    if (teamName.length < 4 || teamDesc.length < 6) {
      ToastComponent({
        message:
          'Team Name must be at least 4 characters and Team Description must be at least 6 characters long.',
      });
      return;
    }

    fetch('https://tsk-final-backend.vercel.app/api/team/createteam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authenToken,
      },
      body: JSON.stringify({
        teamName: teamName,
        teamDesc: teamDesc,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          ToastComponent({message: data.error});
        } else {
          // console.log(data);
          hideModal();
          setteamName('');
          setteamDesc('');
          fetchTeam();
          handleSuccess();
        }
      })
      .catch(err => {
        console.log(err);
        handleBackendError();
      });
  };

  const editTeam = async teamId => {
    setIsModalVisible(false);

    if (!formData.editTitle || !formData.editDesc) {
      ToastComponent({message: 'Please fill in all fields'});
      return;
    }

    // console.log(formData.editTitle);
    // console.log(teamId);

    fetch(
      `https://tsk-final-backend.vercel.app/api/team/updateteam/${teamId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: formData.editTitle,
          teamDesc: formData.editDesc,
        }),
      },
    ).catch(err => {
      console.log(err);
    });
  };

  const fetchTeam = async () => {
    setIsLoading(true);
    console.log('This is auth token', authenToken);
    try {
      const response = await fetch(
        'http://192.168.29.161:8888/api/team/fetchallteams',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authenToken,
            userRole: userRole,
          },
        },
      );

      console.log(response);

      const data = await response.json();
      console.log(data);
      setresultTeamData(data); // Assuming setresultTeamData is a state update function
      setIsLoading(false);
    } catch (error) {
      console.log('Atharva', error);
      setIsLoading(false); // Set loading state to false even if an error occurs.
    }
  };

  const deleteTeam = async teamId => {
    try {
      const response = await fetch(
        `https://tsk-final-backend.vercel.app/api/team/deleteteam/${teamId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        // console.log(`Team with ID ${teamId} deleted successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshFetchTeam = async () => {
    fetchTeam();
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const onStateChange = ({open}) => setOpen(open);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleEditClick = () => {
    setIsModalVisible(true);
  };
  const toggleModal = () => {
    setIsModalVisibleavatar(!isModalVisibleavatar);
  };
  const handleLogout = () => {
    toggleModal();
  };
  return (
    <Provider
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, accent: 'transparent'},
      }}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshFetchTeam}
              />
            }>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles1.addteamcontainerStyle}>
                <View style={{marginTop: 10}}>
                  <Text style={styles1.emaillabelStyle}>Enter Team Name</Text>
                  <TextInput
                    style={[
                      styles1.Emailinput,
                      {backgroundColor: 'transparent', height: 40},
                    ]}
                    placeholder="Team Name"
                    placeholderTextColor="#8d98b0"
                    value={teamName}
                    onChangeText={setteamName}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={styles1.emaillabelStyle}>
                    Enter Team Description
                  </Text>
                  <TextInput
                    style={[
                      styles1.Emailinput,
                      {backgroundColor: 'transparent', height: 40},
                    ]}
                    placeholder="Team Description"
                    placeholderTextColor="#8d98b0"
                    value={teamDesc}
                    onChangeText={setteamDesc}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 290,
                    marginLeft: 15,
                    marginTop: 25,
                  }}>
                  <Button icon="close" mode="contained" onPress={hideModal}>
                    Close
                  </Button>
                  <Button
                    icon="check"
                    mode="contained"
                    onPress={addTeam}
                    style={{marginLeft: 5}}>
                    Create Team
                  </Button>
                </View>
              </Modal>
            </Portal>
            {/* edit title modal */}
            <RBSheet
              ref={bottomSheetRef}
              height={300} // Set the desired height of the bottom sheet
              closeOnDragDown={true}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                container: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
              }}>
              <View style={styles1.btmeditsheet}>
                <View style={{marginTop: 2}}>
                  <Text style={styles1.emaillabelStyle}>Edit Team Title</Text>
                  <TextInput
                    style={[
                      styles1.Emailinput,
                      {backgroundColor: 'transparent', height: 25},
                    ]}
                    placeholder="Team Name"
                    placeholderTextColor="#8d98b0"
                    value={formData.editTitle}
                    onChangeText={value =>
                      setFormData({...formData, editTitle: value})
                    }
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 4,
                      color: '#8d98b0',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Edit Team Description
                  </Text>
                  <TextInput
                    style={[
                      styles1.Emailinput,
                      {backgroundColor: 'transparent', height: 25},
                    ]}
                    placeholder="Team Description"
                    placeholderTextColor="#8d98b0"
                    value={formData.editDesc}
                    onChangeText={value =>
                      setFormData({...formData, editDesc: value})
                    }
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Button
                    icon="close"
                    mode="contained"
                    onPress={closeBottomSheet}>
                    Close
                  </Button>
                  <Button
                    icon="check"
                    mode="contained"
                    onPress={() => editTeam(teamId)}
                    style={{marginLeft: 5}}>
                    Done
                  </Button>
                </View>
              </View>
            </RBSheet>

            <View style={styles.outer}>
              <View style={styles.titleContainer}>
                <Text style={[styles.teamtitleText]}>TaskStack</Text>
                <TouchableOpacity>
                  <Avatardropmodal
                    navigation={navigation}
                    userName={idName}
                    userDes={userDes}
                    removeUser={removeUser}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.dayContainer}>
                <View style={styles.innerdayContainer}>
                  <Text style={[styles.dateText]}>{currentDate}</Text>
                </View>
              </View>
            </View>

            {resultTeamData.length === 0 ? (
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
                    marginTop: 140,
                    textAlign: 'center',
                    letterSpacing: 1.5,
                  }}>
                  You don't have Team to Display
                </Text>
                {userRole == 'ROLE_ADMIN' ? (
                  <Button
                    icon="plus"
                    mode="contained"
                    onPress={() => showModal()}
                    style={{width: 100}}>
                    ADD
                  </Button>
                ) : (
                  ''
                )}
              </View>
            ) : (
              resultTeamData.map(items => (
                <TeamItem
                  key={items._id}
                  navigation={navigation}
                  desc={items.teamDesc}
                  setteamId={setteamId}
                  teamId={teamId}
                  items={items}
                  openBottomSheet={openBottomSheet}
                  person={items.members.length}
                  title={items.teamName}
                  deleteTeam={deleteTeam}
                  setFormData={setFormData}
                  userRole={userRole}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              ))
            )}

            {userRole == 'ROLE_ADMIN' ? (
              <Portal>
                <FAB.Group
                  open={open}
                  visible
                  icon={open ? 'chevron-down' : 'plus'}
                  actions={[
                    {
                      icon: 'account-plus',
                      label: 'New Team',
                      onPress: () => showModal(),
                    },
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    // if (open) {
                    //     // do something if the speed dial is open
                    // }
                  }}
                  overlayColor="transparent"
                />
              </Portal>
            ) : (
              ''
            )}
          </ScrollView>
        </>
      )}
    </Provider>
  );
};

export default HomeScreen;
