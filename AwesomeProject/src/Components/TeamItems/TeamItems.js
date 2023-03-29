import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import { Avatar } from "react-native-paper";

const TeamItems = (props) => {
  return (
    <TouchableOpacity 
      style={{
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        paddingTop: 10,
        paddingLeft: 17,
        flexDirection: 'row',
        alignItems:'center',
        marginBottom:15
      }}>
      <Avatar.Icon size={40} icon="account" style={{backgroundColor:'#f0f4fd'}}/>
      <View style={{flexDirection: 'column', marginLeft: 20}}>
        <Text style={{color: 'black', fontFamily:'Poppins-Medium', fontSize:15}}>{props.userName}</Text>
        <Text style={{color: 'grey', fontFamily:'Poppins-Regular',fontSize:12}}>{props.userDesignation}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TeamItems;
