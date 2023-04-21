import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Teamlist';
import moment from 'moment';
import TeamItem from '../Components/Items/TeamItem';
import { FAB, Provider, DefaultTheme, Portal, Button, Modal, TextInput } from 'react-native-paper';
import styles1 from '../Styles/AddTaskStyle';
const currentDate = moment().format('MMMM DD, YYYY');
const Teamlist = ({ navigation }) => {
    const [tasks, setTasks] = useState([])
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, width: 340, marginLeft: 10, height: 320 };

    const handleSubmit = () => {
        hideModal();
    };


    const fetchData = () => {
        fetch('https://raw.githubusercontent.com/hindavilande05/testAPI/master/team.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTasks(data.teams)
            })
        console.log(tasks);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onStateChange = ({ open }) => setOpen(open);

    return (
        <Provider theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, accent: 'transparent' } }}>
            <ScrollView>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles1.emaillabelStyle}>Enter Team Name</Text>
                            <TextInput
                                style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
                                placeholder="Team Name"
                                placeholderTextColor="#8d98b0"
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles1.emaillabelStyle}>Enter Team Description</Text>
                            <TextInput
                                style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
                                placeholder="Team Description"
                                placeholderTextColor="#8d98b0"
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: 290, marginLeft: 15, marginTop: 25 }}>
                            <Button icon="close" mode="contained" onPress={hideModal}>
                                Close
                            </Button>
                            <Button icon="check" mode="contained" onPress={handleSubmit} style={{ marginLeft: 5 }}>
                                Create Team
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

                    {tasks.length === 0 ? (
                        (

                            <View style={{ width: 360, height: 500, display: 'flex', alignItems: 'center' }}>
                                <Text style={{ color: 'grey', fontSize: 20, padding: 20, marginTop: 140, textAlign: 'center', letterSpacing: 1.5 }}>You don't have Teams to Display</Text>
                                <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')} style={{ width: 100 }}>
                                    ADD
                                </Button>
                            </View>
                        )
                    ) : (
                        tasks.map((items) => (
                            <TeamItem
                                desc={items.desc}
                                person={items.people}
                                title={items.name}
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

export default Teamlist;
