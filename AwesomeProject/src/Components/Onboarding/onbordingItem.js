import { StyleSheet, Text, View,Image, useWindowDimensions } from 'react-native'
import React from 'react'
import NextButton from './NextButton'
const OnbordingItem = ({item}) => {
    const {width} = useWindowDimensions()
  return (

    <View styles={[styles.container,{width}]}>
        <Image source={item.image} style={[styles.image ,{ width ,resizeMode:'contain'}]}/>
        <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text  style={styles.description}>{item.description}</Text>

        </View>
    </View>

  )
}

export default OnbordingItem

const styles = StyleSheet.create({
   
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
        flex:0.7,
        justifyContent:'center',
    },
    title:{
        fontSize:20,
        fontWeight:600,
        marginBottom:1,
        color:'#9893FF',
        textAlign:'center'
    },
    description:{
        fontWeight:300,
        fontSize:15,
        textAlign:'center',
        paddingHorizontal:64,
    }
})