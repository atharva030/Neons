import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../Styles/ProfileStyle'
import { Avatar } from "react-native-paper";


const TeamNames = (props) => {
  return (
    <View style={styles.teamFlex}>
    <View style={styles.team1}>
    <Avatar.Image 
        size={40} 
        source={require('../../../assets/Image/logo.png') } />

    <Text style={styles.teamName}>{props.teamName} </Text>
    <Text style={styles.status}>{props.teamStatus} </Text>
    </View>
    </View>
  )
}

export default TeamNames