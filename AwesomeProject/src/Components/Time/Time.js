import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import styles from '../../Styles/AddTaskStyle';
import {useState} from 'react';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Time = () => {
  const [settleEndTime, setsettleEndTime] = useState('');
  const [settleStartTime, setsettleStartTime] = useState('');
  const [isStTimePickerVisible, setStTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const showStPicker = () => {
    setStTimePickerVisibility(true);
    console.log(isStTimePickerVisible);
  };

  const hidestTimePicker = () => {
    setStTimePickerVisibility(false);
  };

  const handleStartTime = StTime => {
    const dt = new Date(StTime);
    dt.toLocaleString();
    console.warn(
      'A Start has been picked: ',
      dt.toLocaleString().split(',')[1],
    );
    setsettleStartTime(dt.toLocaleString().split(',')[1]);
    console.log(settleStartTime);
    hidestTimePicker();
  };
  const showEndPicker = () => {
    setEndTimePickerVisibility(true);
    console.log(isEndTimePickerVisible);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleEndTime = endTime => {
    const end = new Date(endTime);
    end.toLocaleString();
    console.warn('A End has been picked: ', end.toLocaleString().split(',')[1]);
    setsettleEndTime(end.toLocaleString().split(',')[1]);
    console.log(settleEndTime);
    hideEndTimePicker();
  };
  return (
    <View style={styles.timeContainer}>
      <View style={{marginTop: 10}}>
        <Text style={styles.labelStyle}>END TIME</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={showEndPicker} style={{width: '50%'}}>
            <TextInput
              style={styles.timeInput}
              value={settleStartTime}
              onPress={handleStartTime}
              editable={false} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              placeholderTextColor="#8d98b0"
            />
          </Pressable>
          <Button icon="clock-time-three" onPress={showStPicker}></Button>
          <DateTimePickerModal
            icon="clock-time-three"
            isVisible={isStTimePickerVisible}
            mode="time"
            onConfirm={handleStartTime}
            onCancel={hidestTimePicker}
          />
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.labelStyle}>END TIME</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={showEndPicker} style={{width: '50%'}}>
            <TextInput
              style={styles.timeInput}
              value={settleEndTime}
              onPress={handleEndTime}
              editable={false} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              // Making the Under line Transparent.
              placeholderTextColor="#8d98b0"
              //   underlineColorAndroid="transparent"
            />
          </Pressable>
          <Button icon="clock-time-three" onPress={showEndPicker}></Button>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleEndTime}
            onCancel={hideEndTimePicker}
          />
        </View>
      </View>
    </View>
  );
};

export default Time;
