import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  BackHandler,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../Styles/Teamlist';
import moment from 'moment';
import TeamItem from '../Components/Items/TeamItem';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';
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
import RotatedGradient from '../Components/RotatedGradient';
const handleSuccess = () => {
  ToastComponent({message: 'Team Added successfully'});
};
const toggleMenulogout = async () => {
  // eslint-disable-next-line no-undef
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
    // eslint-disable-next-line no-undef
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
  const [photoUrl, setphotoUrl] = useState('');
  const [Method, setMethod] = useState('');
  const getUserRole = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      // console.log('this is from home screen ', userData);
      if (userData) {
        const {
          userRole,
          userName,
          authToken,
          userDes,
          photoUrl,
          Signin_Method,
        } = JSON.parse(userData);
        setUserRole(userRole);
        setidName(userName);
        setauthenToken(authToken);
        setuserDes(userDes);
        setphotoUrl(photoUrl);
        setMethod(Signin_Method);
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
    // console.log(authenToken);
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
    // console.log('This is auth token', authenToken);
    try {
      const response = await fetch(
        'https://tsk-final-backend.vercel.app/api/team/fetchallteams',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authenToken,
            userRole: userRole,
          },
        },
      );

      // console.log(response);
      const data = await response.json();
      // console.log(data);
      setresultTeamData(data); // Assuming setresultTeamData is a state update function
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
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
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomColor = getRandomColor();
  return (
    <Provider>
      <LinearGradient
        colors={['#140d13', '#0a1a1b']} // Set your desired gradient colors
        start={{x: 0, y: 1}} // Adjust the start point as needed
        end={{x: 1, y: 0}} // Adjust the end point as needed
        style={{flex: 1}}>
        {isLoading ? (
          <AppLoader />
        ) : (
          <ScrollView
            style={styles.fullscreen}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshFetchTeam}
                colors={['#B52C60']}
                progressBackgroundColor="#E0E0E0"
                title="Pull to refresh"
                tintColor="#B52C60"
                titleColor="#333"
              />
            }>
            {/* <LinearGradient
            colors={['#140d13', '#0a1a1b']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{height: '100%'}}> */}
            {/* <View> */}
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              enabled={Platform.OS === 'ios' ? true : false}
              contentContainerStyle={{flex: 1}}
              // keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
              keyboardVerticalOffset={10000}>
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={styles1.addteamcontainerStyle}>
                  {/* <LinearGradient
                  colors={['#001314', '#1E010B']}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{height: '100%'}}> */}
                  <TouchableOpacity
                    style={{width: '100%', flexDirection: 'row-reverse'}}
                    onPress={hideModal}>
                    <View
                      style={{
                        backgroundColor: '#20212a',
                        height: 40,
                        width: 40,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon name="close" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={{width: '100%'}}>
                    <Text style={styles1.emaillabelStyle}>Enter Team Name</Text>
                    <TextInput
                      style={{
                        backgroundColor: 'transparent',
                        height: 40,
                        borderBottomWidth: 1, // Add an underline
                        borderBottomColor: 'grey', // Underline color
                        paddingLeft: 0, // Align the input text to the left
                        textAlignVertical: 'bottom', // Align the placeholder text to the bottom
                        color: 'white',
                      }}
                      // placeholder="Team Name"
                      placeholderTextColor="white"
                      value={teamName}
                      onChangeText={setteamName}
                    />
                  </View>
                  <View style={{width: '100%', marginTop: 10}}>
                    <Text style={styles1.emaillabelStyle}>
                      Enter Team Description
                    </Text>
                    <TextInput
                      style={{
                        backgroundColor: 'transparent',
                        height: 40,
                        borderBottomWidth: 1, // Add an underline
                        borderBottomColor: 'grey', // Underline color
                        paddingLeft: 0, // Align the input text to the left
                        textAlignVertical: 'bottom', // Align the placeholder text to the bottom
                        color: 'white',
                      }}
                      // placeholder="Team Description"
                      // placeholderTextColor="white"
                      value={teamDesc}
                      onChangeText={setteamDesc}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      // marginLeft: 15,
                      marginTop: 25,
                    }}>
                    {/* <Button
                      icon="close"
                      mode="contained"
                      textColor="#fff"
                      onPress={hideModal}
                      style={{
                        marginLeft: 5,
                        backgroundColor: '#351C4F',
                        borderStyle: 'solid',
                        borderWidth: 2,
                      }}>
                      <Text style={{color: '#fff'}}>Close</Text>
                    </Button> */}
                    <Button
                      icon="check"
                      textColor="#fff"
                      mode="contained"
                      onPress={addTeam}
                      style={{
                        marginLeft: 5,
                        backgroundColor: '#351C4F',
                        borderStyle: 'solid',
                        borderWidth: 2,
                        // width:100
                      }}>
                      <Text style={{color: '#fff'}}>Create</Text>
                    </Button>
                  </View>
                  {/* </LinearGradient> */}
                </Modal>
              </Portal>
            </KeyboardAvoidingView>

            {/* edit title modal */}
            <RBSheet
              ref={bottomSheetRef}
              height={270} // Set the desired height of the bottom sheet
              closeOnDragDown={true}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                container: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: 'black',
                },
                draggableIcon: {
                  backgroundColor: 'white', // Set the drag-down color to white
                },
              }}>
              {/* <LinearGradient
                colors={['#140d13', '#0a1a1b']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={{height: '100%'}}> */}
              <View style={styles1.btmeditsheet}>
                <View style={{}}>
                  <Text style={styles1.emaillabelStyle}>Edit Team Title</Text>
                  <TextInput
                    style={{
                      backgroundColor: 'transparent',
                      height: 40,
                      borderBottomWidth: 1, // Add an underline
                      borderBottomColor: 'grey', // Underline color
                      paddingLeft: 0, // Align the input text to the left
                      textAlignVertical: 'bottom', // Align the placeholder text to the bottom
                      color: 'white',
                    }}
                    // placeholder="Team Name"
                    // placeholderTextColor="#6DED65"
                    value={formData.editTitle}
                    onChangeText={value =>
                      setFormData({...formData, editTitle: value})
                    }
                  />
                </View>
                <View style={{marginTop: 14}}>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 4,
                      color: 'white',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Edit Team Description
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: 'transparent',
                      height: 40,
                      borderBottomWidth: 1, // Add an underline
                      borderBottomColor: 'grey', // Underline color
                      paddingLeft: 0, // Align the input text to the left
                      textAlignVertical: 'bottom', // Align the placeholder text to the bottom
                      color: 'white',
                    }}
                    // placeholder="Team Description"
                    // placeholderTextColor="#6DED65"
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
                    justifyContent: 'flex-end',
                  }}>
                  {/* <Button
                    icon="close"
                    mode="contained"
                    textColor="black"
                    onPress={closeBottomSheet}
                    style={{
                      marginLeft: 5,
                      backgroundColor: '#6DED65',
                      borderColor: '#6DED65',
                      borderStyle: 'solid',
                      borderWidth: 2,
                    }}>
                    <Text style={{color: 'black'}}>Close</Text>
                  </Button> */}
                  <Button
                    icon="check"
                    textColor="white"
                    mode="contained"
                    onPress={() => editTeam(teamId)}
                    style={{
                      marginLeft: 5,
                      backgroundColor: '#351c4f',
                      borderColor: '',
                      borderStyle: 'solid',
                      borderWidth: 2,
                      marginTop: 10,
                    }}>
                    <Text style={{color: 'white'}}> Done </Text>
                  </Button>
                </View>
              </View>
              {/* </LinearGradient> */}
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
                    photoUrl={photoUrl}
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
                    color: '#fff',
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
                    style={{
                      width: 100,
                      backgroundColor: '#351c4f',
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#351c4f',
                      }}>
                      ADD
                    </Text>
                  </Button>
                ) : (
                  ''
                )}
              </View>
            ) : (
              resultTeamData.map((items, index) => (
                <TeamItem
                  key={items._id}
                  index={index}
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
                  backdropColor="rgba(1, 1, 1, 0.9)"
                  color="#fff"
                  fabStyle={{
                    backgroundColor: '#0d181b',
                    borderColor: '#272626',
                    borderWidth: 1,
                  }}
                  actions={[
                    {
                      icon: 'account-plus',
                      label: 'New Team',
                      labelTextColor: '#fff',
                      style: {
                        backgroundColor: '#0d181b',
                        borderColor: '#272626',
                        borderWidth: 1,
                      },
                      color: '#fff',

                      onPress: () => showModal(),
                    },
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    // if (open) {
                    //     // do something if the speed dial is open
                    // }
                  }}
                  overlayColor="#transparent"
                />
              </Portal>
            ) : (
              ''
            )}
            {/* </View>
          </LinearGradient> */}
          </ScrollView>
        )}
      </LinearGradient>
    </Provider>
  );
};

export default HomeScreen;
