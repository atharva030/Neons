import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { FAB, Portal, Provider } from 'react-native-paper'
import styles from '../Styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';

const Team_scr1 = ({ navigation }) => {


    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <ScrollView>
            <View style={styles.Addfullscreen}>
                <View style={styles.Addsubscreen}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', marginTop: 20 }}
                        onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={30} color="white" />
                        <Text style={styles.AddtitleText}>Add Task</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addSecondScreen}>
                    <Provider>
                        <Portal>
                            <FAB.Group
                                open={open}
                                visible
                                icon={open ? 'chevron-down' : 'plus'}
                                actions={[
                                    {
                                        icon: 'account-plus',
                                        label: 'New Member',
                                        // onPress: () => console.log('Pressed star'),
                                    },
                                    {
                                        icon: 'account-check',
                                        label: 'Existing Member',
                                        // onPress: () => console.log('Pressed email'),
                                    }

                                ]}
                                onStateChange={onStateChange}
                                onPress={() => {
                                    if (open) {
                                        // do something if the speed dial is open
                                    }
                                }}
                            />
                        </Portal>
                    </Provider>
                </View>
            </View>
        </ScrollView>




    );
}


export default Team_scr1
