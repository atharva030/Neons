import { View, Text, TextInput,Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from 'react-native-paper';
import styles from '../../Styles/AddTaskStyle'
const Calender = () => {
  const [settleDate, setsettleDate] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    // console.log(isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dt=new Date(date)
    dt.toLocaleString()
    console.warn("A date has been picked: ", dt.toLocaleString());
    setsettleDate(dt.toDateString())
    // console.log(settleDate)
    hideDatePicker();
  };
  return (
  <View style={{marginTop: 10}}>
  <Text style={styles.labelStyle}>DATE</Text>
  <View style={{flexDirection:'row'}}>
  <Pressable onPress={showDatePicker}  style={{width:"93%"}}>
  <TextInput
   style={styles.dateInput} 
   value={settleDate} 
   onPress={handleConfirm} 
   editable={false} // Adding hint in TextInput using Placeholder option.
    placeholder=""
    // Making the Under line Transparent.
    placeholderTextColor="#8d98b0"
    //   underlineColorAndroid="transparent"
  />
  </Pressable>
       <Button icon="calendar" onPress={showDatePicker}>
        </Button>
      <DateTimePickerModal
       isVisible={isDatePickerVisible}
       mode="date"
       onConfirm={handleConfirm}
       onCancel={hideDatePicker}
     />
  
</View>
</View>
  )
}

export default Calender