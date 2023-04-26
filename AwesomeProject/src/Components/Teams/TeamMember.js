import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-paper";

const TeamMember = (props) => {

    const handleSelect = (id) => {
        const newIds = [...props.selectedIds, id];
        console.log('Selected:', newIds);
        props.setSelectedIds(newIds);
    };

    const handleDeselect = (id) => {
        const newIds = props.selectedIds.filter(prevId => prevId !== id);
        console.log('Deselected:', newIds);
        props.setSelectedIds(newIds);
    };

    const handlePress = () => {
        if (props.selectedIds.includes(props.id)) {
            handleDeselect(props.id);
        } else {
            handleSelect(props.id);
        }
    };

    return (
        <Chip
            onPress={handlePress}
            style={[
                styles.chip,
                props.selectedIds.includes(props.id) && styles.chipPressed
            ]}
        >
            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }}>
                <Avatar.Image
                    size={40}
                    source={require('../../../assets/Image/profile1.png')}
                    avatarStyle={{
                        borderWidth: 2,
                        borderColor: 'white',
                        borderTopLeftRadius: 1,
                        borderStyle: 'solid',
                        marginRight: 50
                    }}
                />
                <View>
                    <Text style={{
                        fontFamily: "Poppins-Regular",
                        fontSize: 16,
                        color: '#0b204c',
                    }}>{props.name} </Text>
                    <Text style={{
                        fontFamily: "Poppins-ExtraLight",
                        fontSize: 12,
                        color: 'black'
                    }}>{props.designation} </Text>
                </View>
            </View>
        </Chip>
    )
}

const styles = StyleSheet.create({
    chip: {
        backgroundColor: 'white',
        width: 280,
        height: 70,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 20,
        marginTop: 10,
    },
    chipPressed: {
        width: 280,
        backgroundColor: '#ebdefa',
        borderWidth: 1,
        height: 70,
        borderColor: "thistle",
        borderRadius: 20,
    },
});

export default TeamMember;
