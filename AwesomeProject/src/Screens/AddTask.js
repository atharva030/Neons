import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from '../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import AvatarImage from '../Components/Avatar/Avatar';
import Calender from '../Components/Calender/Calender';
import Time from '../Components/Time/Time';
import { RadioButton } from 'react-native-paper';
import { Button, Avatar } from 'react-native-paper';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { useEffect } from 'react';
const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const AddTask = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState('');
  const [taskName, settaskName] = useState('');
  const [stTime, setstTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  // name st time end time desc status
  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };
  const first = () => {
    setChecked('first')
    setStatus("URGENT")
  };
  const second = () => {
    setChecked('second')
    setStatus("RUNNING")
  };
  const third = () => {
    setChecked('third')
    setStatus("ONGOING")
  };
  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const showModal = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  const hideModal = () => setVisible(false);

  return (
    <HideKeyboard>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <Icon
              name="checkmark-circle-outline"
              size={90}
              color="#008000"
            />
            <Text style={styles.modalTital}>Congrats !</Text>
            <Text style={styles.modalSubtital}>
              You successfully created a task in your account.
            </Text>
          </Modal>
        </Portal>


        <View style={styles.modalSecondScreen}>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.labelStyle}>TASK NAME</Text>
            <TextInput
              style={styles.input} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              // Making the Under line Transparent.
              placeholderTextColor="#8d98b0"
              //   underlineColorAndroid="transparent"
              value={taskName}
              onChangeText={settaskName}
            />
          </View>
          {/* <View style={{marginTop: 20}}>
                <Text style={styles.labelStyle}>TEAM MEMBER</Text>
              </View> */}
          {/* <View style={{flexDirection: 'row'}}>
                <AvatarImage text="Hindavi" />
                <AvatarImage text="John" />
                <AvatarImage text="Atharva" />
                <AvatarImage text="Hindavi" />
                <TouchableOpacity>
                  <Avatar.Text
                    style={{
                      marginTop: 10,
                      backgroundColor: '#dadada',
                      color: 'black',
                    }}
                    size={55}
                    label="+"
                  />
                </TouchableOpacity>
              </View> */}
          <View style={{ marginTop: 10 }}>
            {/* <Calender /> */}
            <Time setstTime={setstTime} setendTime={setendTime} />
            <View style={{ marginTop: 10 }}>
              <Text style={styles.labelStyle}>DESCRIPTION</Text>
              <TextInput
                style={styles.input} // Adding hint in TextInput using Placeholder option.
                placeholder=""
                // Making the Under line Transparent.
                placeholderTextColor="#8d98b0"
                //   underlineColorAndroid="transparent"
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.labelStyle}>STATUS</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginLeft: 45,
                marginTop: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 187,
                }}>
                <RadioButton
                  // value={}
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={first}
                  color="red"
                />
                <Pressable
                  onPress={first}
                  style={{ width: '50%' }}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 15,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    URGENT
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 195,
                }}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={second}
                  color="green"
                />
                <Pressable
                  onPress={second}
                  style={{ width: '50%' }}>
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 15,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    RUNNING
                  </Text>
                </Pressable>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="third"
                  status={checked === 'third' ? 'checked' : 'unchecked'}
                  onPress={third}
                  color="#8e8cdb"
                />
                <Pressable
                  onPress={third}
                  style={{ width: '50%' }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      color: '#8e8cdb',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    ONGOING
                  </Text>
                </Pressable>
              </View>
            </View>

          </View>
        </View>
      </Provider>
    </HideKeyboard>
  );
};

export default AddTask;
