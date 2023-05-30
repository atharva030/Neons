import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Teamlist';
import moment from 'moment';
import TeamItem from '../Components/Items/TeamItem';
import { FAB, Provider, DefaultTheme, Portal, Button, Modal, TextInput } from 'react-native-paper';
import styles1 from '../Styles/AddTaskStyle';
const currentDate = moment().format('MMMM DD, YYYY');
const HomeScreen = ({ navigation }) => {
    const [teamName, setteamName] = useState('');
    const [teamDesc, setteamDesc] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [resultTeamData, setresultTeamData] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({ editTitle: "", editDesc: "" });
    const [teamId, setteamId] = useState("")
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, width: 340, marginLeft: 10, height: 320 };
    const onRefresh = () => {
        setRefreshing(true);
        fetchTeam()
        setRefreshing(false);
    };
    const addTeam = async () => {
        fetch('http://192.168.43.60:8888/api/team/createteam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NDExNWE4OWM2YzBkNWVkM2NkZjk1In0sImlhdCI6MTY4NDUxMzMxNn0.jSfavFDUHDr0Kc4AB-nj6ySuuaB04b7tuQEgHKBo1og"
                //    await AsyncStorage.getItem('auth-token'),
            },
            body: JSON.stringify({
                teamName: teamName,
                teamDesc: teamDesc,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                hideModal()
                setteamName('')
                setteamDesc('')
                fetchTeam()
            })
            .catch((err) => {
                console.log(err);
            });

    }

    // console.log("sadaddaddasdad",teamId)
    const editTeam = async (teamId) => {
        setIsModalVisible(false);
        console.log(formData.editTitle);
        console.log(teamId);
        fetch(`http://192.168.43.60:8888/api/team/updateteam/${teamId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            teamName: formData.editTitle,
            teamDesc: formData.editDesc,
          }),
        }).catch((err) => {
          console.log(err);
        });
      };
      
    const fetchTeam = async () => {
        // console.log("Hey")
        fetch('http://192.168.43.60:8888/api/team/fetchallteams', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NDExNWE4OWM2YzBkNWVkM2NkZjk1In0sImlhdCI6MTY4NDUxMzMxNn0.jSfavFDUHDr0Kc4AB-nj6ySuuaB04b7tuQEgHKBo1og",
            },
        })
            .then(response => response.json())
            .then(data => {
                setresultTeamData(data)

                // console.log(resultTeamData); // this will log the array of objects returned by the API
                // you can perform any additional logic here based on the returned data
                //   navigation.navigate('NavigationScreen');
                // for (let i = 0; i < resultTeamData.length; i++) {
                //     const membersSize = resultTeamData[i].members.length;
                //     console.log(`The size of members array in ${data[i].name} is ${membersSize}`);
                // }
            })
            .catch(err => {
                console.log(err);
            });

    }
    const refreshFetchTeam = async () => {
        // console.log("Hey")
        setRefreshing(true)
        fetch('http://192.168.43.60:8888/api/team/fetchallteams', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NDExNWE4OWM2YzBkNWVkM2NkZjk1In0sImlhdCI6MTY4NDUxMzMxNn0.jSfavFDUHDr0Kc4AB-nj6ySuuaB04b7tuQEgHKBo1og",
            },
        })
            .then(response => response.json())
            .then(data => {
                setresultTeamData(data)
                setTimeout(() => {
                    setRefreshing(false)
                    console.log("after", refreshing)
                }, 2000);
            })
            .catch(err => {
                console.log(err);
            });

    }
    // const refreshFetchTeam = async () => {
    //     // console.log("Hey")
    //     setRefreshing(true)
    //     fetchTeam();
    // }
    const deleteTeam = async (teamId) => {
        try {
            const response = await fetch(`http://192.168.43.60:8888/api/team/deleteteam/${teamId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Team with ID ${teamId} deleted successfully`);
            } else {
                console.log(`Error deleting team with ID ${teamId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTeam()
    }, [])
    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    const onStateChange = ({ open }) => setOpen(open);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleEditClick = () => {
        setIsModalVisible(true);
    };
    return (
        <Provider theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, accent: 'transparent' } }}>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshFetchTeam}
                />
            }>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles1.emaillabelStyle}>Enter Team Name</Text>
                            <TextInput
                                style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
                                placeholder="Team Name"
                                placeholderTextColor="#8d98b0"
                                value={teamName}
                                onChangeText={setteamName}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles1.emaillabelStyle}>Enter Team Description</Text>
                            <TextInput
                                style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
                                placeholder="Team Description"
                                placeholderTextColor="#8d98b0"
                                value={teamDesc}
                                onChangeText={setteamDesc}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: 290, marginLeft: 15, marginTop: 25 }}>
                            <Button icon="close" mode="contained" onPress={hideModal}>
                                Close
                            </Button>
                            <Button icon="check" mode="contained" onPress={addTeam} style={{ marginLeft: 5 }}>
                                Create Team
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                {/* edit title modal */}
                <Portal>
                    <Modal visible={isModalVisible} onDismiss={handleModalClose} contentContainerStyle={containerStyle}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles1.emaillabelStyle}>Edit Task Title</Text>
                            <TextInput
                                style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
                                placeholder="Team Name"
                                placeholderTextColor="#8d98b0"
                                value={formData.editTitle}
                                onChangeText={(value) => setFormData({ ...formData, editTitle: value })}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles1.emaillabelStyle}>Edit Task Description</Text>
                            <TextInput
                                style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
                                placeholder="Team Description"
                                placeholderTextColor="#8d98b0"
                                value={formData.editDesc}
                                onChangeText={(value) => setFormData({ ...formData, editDesc: value })}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: 290, marginLeft: 15, marginTop: 25 }}>
                            <Button icon="close" mode="contained" onPress={handleModalClose}>
                                Close
                            </Button>
                            <Button icon="check" mode="contained" onPress={()=>editTeam(teamId)} style={{ marginLeft: 5 }}>
                                Done
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                <View style={styles.fullscreen}>
                    <View style={styles.outer}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.teamtitleText]}>TaskStack</Text>
                            <TouchableOpacity>
                                <Image source={avatar} style={styles.logo} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dayContainer}>
                            <View style={styles.innerdayContainer}>
                                <Text style={[styles.dateText]}>{currentDate}</Text>
                            </View>
                        </View>
                    </View>

                    {resultTeamData.length === 0 ? (
                        (

                            <View style={{ width: 360, height: 500, display: 'flex', alignItems: 'center' }}>
                                <Text style={{ color: 'grey', fontSize: 20, padding: 20, marginTop: 140, textAlign: 'center', letterSpacing: 1.5 }}>You don't have Teams to Display</Text>
                                <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')} style={{ width: 100 }}>
                                    ADD
                                </Button>
                            </View>
                        )
                    ) : (
                        resultTeamData.map((items) => (
                            <TeamItem
                                navigation={navigation}
                                desc={items.teamDesc}
                                setteamId={setteamId}
                                teamId={teamId}
                                items={items}
                                handleEditClick={handleEditClick}
                                person={items.members.length}
                                title={items.teamName}
                                deleteTeam={deleteTeam}
                                setFormData={setFormData}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            />
                        ))
                    )}

                </View>
                <Portal>
                    <FAB.Group
                        open={open}
                        visible
                        icon={open ? 'chevron-down' : 'plus'}
                        actions={[
                            {
                                icon: 'account-plus',
                                label: 'New Team',
                                onPress: () => showModal()
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {

                            // if (open) {
                            //     // do something if the speed dial is open
                            // }
                        }}
                        overlayColor='transparent'
                    />
                </Portal>
            </ScrollView>
        </Provider>
    );
};

export default HomeScreen;
