import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Chip, Avatar } from 'react-native-paper';

const MemberFilter = (props) => {
    return (
        <View style={styles.chipWrapper}>
            <View style={styles.chip}>
                <View style={styles.container}>
                    <Avatar.Image
                        size={40}
                        source={require('../../../assets/Image/profile1.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.nameText}>{props.name}</Text>
                        <Text style={styles.designationText}>{props.designation}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chipWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    chip: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'thistle',
        borderRadius: 20,
        marginTop: 20,
        width: 280,
        height: 70,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin:12,
        // justifyContent:"center",
        paddingHorizontal: 10, // Added paddingHorizontal to create spacing between image and text
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: 30, // Added marginRight to create spacing between image and text
    },
    textContainer: {
        // justifyContent: 'center',
        // margin:20

    },
    nameText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: 'black',
    },
    designationText: {
        fontFamily: 'Poppins-ExtraLight',
        fontSize: 12,
        color: 'black',
    },
});

export default MemberFilter;
