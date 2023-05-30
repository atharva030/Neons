//This screen is created just for testing purpose


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CircularProgressBar from '../Components/CircularProgressBar'
import Progress from 'react-native-progress';

const ProgressBarScreen = () => {
  return (
    <View>
    
<CircularProgressBar selectedValue={8} />

<CircularProgressBar
    selectedValue={25}
    maxValue={50}
    textColor='#f00'
    activeStrokeColor='#cc6600'
    withGradient
/>

<CircularProgressBar
    selectedValue={75}
    maxValue={100}
    radius={100}
    activeStrokeColor='#0f4fff'
    withGradient
/>
<CircularProgressBar
    selectedValue={10}
    maxValue={100}
    radius={50}
    activeStrokeColor='#0f4fff'
    withGradient
/>

    </View>

  )
};

export default ProgressBarScreen

const styles = StyleSheet.create({
  container:{
    margin:50
  }
})