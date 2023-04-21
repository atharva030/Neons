import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Teamlist';
import moment from 'moment';
import TeamItem from '../Components/Items/TeamItem';
import { FAB, Provider, DefaultTheme, Portal, Button } from 'react-native-paper';
const currentDate = moment().format('MMMM DD, YYYY');
const Teamlist = ({ navigation }) => {
    const [tasks, setTasks] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const fetchData = () => {
        fetch('https://raw.githubusercontent.com/hindavilande05/testAPI/master/team.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTasks(data.teams)
            })
    }
    console.log(tasks);

    useEffect(() => {
        fetchData()
    }, [])

    const onStateChange = ({ open }) => setOpen(open);

    return (
        <Provider theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, accent: 'transparent' } }}>
            <ScrollView>
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
                                onPress: () => setModalVisible(true),
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                        overlayColor='transparent'
                    />
                </Portal>
            </ScrollView>
        </Provider>
    );
};

export default Teamlist;
