import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../Styles/Teamlist';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';

const TeamItem = props => {
    const appFun = (id) => {
        console.log(id)
        props.setteamId(id)
    }
    // const [statusColor, setStatusColor] = useState("");
    status = props.status;
    return (
        <TouchableOpacity style={styles.teamFlex} onPress={() => appFun(props.items._id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            </View>
            <View style={styles.mainSecondFlex}>
                <View style={styles.secondflex}>
                    <View style={styles.secondSubFlex}>
                        <Text style={styles.teamBigText}>{props.title}</Text>
                        <Icon name='md-arrow-forward-circle-sharp' size={30} color="black" />
                    </View>
                    <Text style={styles.taskText}>{props.desc}</Text>
                </View>
                <View style={styles.flexIcon}>

                    <View style={styles.iconStyle}>
                        <TouchableOpacity>
                            <Icon name="people" size={18} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.personText}>{props.person} Persons</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TeamItem;