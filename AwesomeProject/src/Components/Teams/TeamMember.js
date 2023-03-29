import { View, Text } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-paper";

const TeamMember = (props) => {
  return (

    <View style={{
        flex:1,
        flexDirection: 'column',
        height: 150,
        width: 150,
        margin: 5, 
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
            alignItems: 'center',
    }}>
        <View style={{ 
        }}>
            <Avatar.Image 
                size={40} 
                source={require('../../../assets/Image/profile1.png') } 
                avatarStyle={{ 
                    borderWidth: 2, 
                    borderColor: 'white', 
                    borderTopLeftRadius: 1, 
                    borderStyle:'solid' }} />
        </View>
        <Text style={{
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            color: '#0b204c',
            paddingTop: 20
        }}>{props.name} </Text>
        <Text style={{
            fontFamily: "Poppins-ExtraLight",
            fontSize: 12,
            
        }}>{props.designation} </Text>
    </View> 
  )
}

export default TeamMember