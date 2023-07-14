import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import styles from '../../Styles/AddTaskStyle';
import {useState} from 'react';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Time = ({setendDate,setstDate}) => {
  const [settleEndTime, setsettleEndTime] = useState('');
  const [settleStartTime, setsettleStartTime] = useState('');
  const [isStDatePickerVisible, setStDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showStDatePicker = () => {
    setStDatePickerVisibility(true);
  };

  const hideStDatePicker = () => {
    setStDatePickerVisibility(false);
  };

  const handleStartDate = (StDate) => {
    const dt = new Date(StDate);
    setstDate(dt.toLocaleDateString('en-US'))
    // console.warn('A Start date has been picked: ', dt.toLocaleDateString('en-US'));
    setsettleStartTime(dt.toLocaleDateString('en-US'));
    hideStDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDate = (endDate) => {
    const end = new Date(endDate);
    
    // console.warn('An End date has been picked: ', end.toLocaleDateString('en-US'));
    setendDate(end.toLocaleDateString('en-US'))
    // check if end date is greater than start date
    const start = new Date(settleStartTime);
    if (end <= start) {
      console.warn('End date must be greater than Start date');
      // return or display an error message
      return;
    }

    setsettleEndTime(end.toLocaleDateString('en-US'));
    hideEndDatePicker();
  };

  return (
    <View style={styles.timeContainer}>
      <View style={{marginTop: 10}}>
        <Text style={styles.labelStyle}>START DATE</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={showStDatePicker} style={{width: '50%'}}>
            <TextInput
              style={styles.timeInput}
              value={settleStartTime}
              editable={false} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              placeholderTextColor="#8d98b0"
            />
          </Pressable>
          <Button icon="calendar" onPress={showStDatePicker}></Button>
          <DateTimePickerModal
            isVisible={isStDatePickerVisible}
            mode="date"
            onConfirm={handleStartDate}
            onCancel={hideStDatePicker}
          />
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.labelStyle}>END DATE</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={showEndDatePicker} style={{width: '50%'}}>
            <TextInput
              style={styles.timeInput}
              value={settleEndTime}
              editable={false} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              placeholderTextColor="#8d98b0"
            />
          </Pressable>
          <Button icon="calendar" onPress={showEndDatePicker}></Button>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDate}
            onCancel={hideEndDatePicker}
          />
        </View>
      </View>
   
    </View>
  );
};

export default Time;
