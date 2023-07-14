import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
  Alert,
} from 'react-native';
import { Modal, Portal, Provider, Button, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Time from '../Components/Time/Time';
import styles from '../Styles/AddTaskStyle';
import { ToastAndroid } from 'react-native';

const showSuccessToast = () => {
  ToastAndroid.showWithGravity(
    'Task Added Successfully',
    ToastAndroid.SHORT,
    ToastAndroid.TOP
  );
};

const showBackendErrorToast = () => {
  ToastAndroid.showWithGravity(
    'Please Try again later!',
    ToastAndroid.SHORT,
    ToastAndroid.TOP
  );
};

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const AddTask = (props) => {
  const { navigation, hideAddModal, teamIdByItem } = props;

  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState('');
  const [taskName, setTaskName] = useState('');
  const [stDate, setStDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  const first = () => {
    setChecked('first');
    setStatus('URGENT');
  };

  const second = () => {
    setChecked('second');
    setStatus('RUNNING');
  };

  const third = () => {
    setChecked('third');
    setStatus('ONGOING');
  };

  const validateForm = () => {
    if (taskName.trim().length < 6) {
      Alert.alert('Invalid Task Name', 'Task Name must be at least 6 characters long.');
      return false;
    }

    const currentDate = new Date();
    const yesterday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1
    );

    if (new Date(stDate) <= yesterday) {
      Alert.alert(
        'Invalid Start Date',
        'Start Date must be greater than the current date.'
      );
      return false;
    }

    if (new Date(endDate) <= new Date(stDate)) {
      Alert.alert(
        'Invalid End Date',
        'End Date must be greater than the Start Date.'
      );
      return false;
    }

    return true;
  };

  const submitForm = () => {
    if (validateForm()) {
      addTaskdb();
    }
  };

  const addTaskdb = () => {
    const currentDate = new Date();
    const yesterday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1
    );

    if (taskName.trim() !== '') {
      if (new Date(stDate) > yesterday && new Date(endDate) > new Date(stDate)) {
        // Add the API call here to add the task
        // You can pass the required values to the API call
        // Example: addTaskdb(taskName, description, status, stDate, endDate);

        // Sample API call
        fetch(`https://tsk-final-backend.vercel.app/api/task/${teamIdByItem}/tasks`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tasks: [
              {
                taskName: taskName,
                taskDesc: description,
                status: status,
                startDate: stDate,
                endDate: endDate,
              },
            ],
          }),
        })
          .then((response) => response.text())
          .then((text) => console.log(text))
          .catch((error) => {
            console.log(error);
            showBackendErrorToast();
          });

        showSuccessToast();
        hideAddModal();
      } else {
        Alert.alert(
          'Invalid Dates',
          'Please ensure that the start date is greater than yesterday and the end date is greater than the start date.'
        );
      }
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const hideModal = () => setVisible(false);

  return (
    <HideKeyboard>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
          >
            <Icon name="checkmark-circle-outline" size={90} color="#008000" />
            <Text style={styles.modalTital}>Congrats!</Text>
            <Text style={styles.modalSubtital}>
              You successfully created a task in your account.
            </Text>
          </Modal>
        </Portal>

        <View style={styles.modalSecondScreen}>
          <Text style={styles.labelStyle}>TASK NAME</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#8d98b0"
            value={taskName}
            onChangeText={setTaskName}
            required
          />

          <View style={{ marginTop: 10 }}>
            <Time setstDate={setStDate} setendDate={setEndDate} />

            <View style={{ marginTop: 10 }}>
              <Text style={styles.labelStyle}>DESCRIPTION</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#8d98b0"
                value={description}
                onChangeText={setDescription}
                required
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
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 187,
                }}
              >
                <RadioButton
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={first}
                  color="red"
                />
                <Pressable onPress={first} style={{ width: '50%' }}>
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 15,
                      fontFamily: 'Poppins-Medium',
                    }}
                  >
                    URGENT
                  </Text>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 195,
                }}
              >
                <RadioButton
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={second}
                  color="green"
                />
                <Pressable onPress={second} style={{ width: '50%' }}>
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 15,
                      fontFamily: 'Poppins-Medium',
                    }}
                  >
                    RUNNING
                  </Text>
                </Pressable>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  status={checked === 'third' ? 'checked' : 'unchecked'}
                  onPress={third}
                  color="#8e8cdb"
                />
                <Pressable onPress={third} style={{ width: '50%' }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      color: '#8e8cdb',
                      fontFamily: 'Poppins-Medium',
                    }}
                  >
                    ONGOING
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 290,
              marginBottom: 15,
            }}
          >
            <Button
              icon="close"
              mode="contained"
              onPress={hideAddModal}
              style={{ marginLeft: 25 }}
            >
              Close
            </Button>

            <Button
              icon="check"
              mode="contained"
              onPress={() => {
                Alert.alert(
                  'Confirmation',
                  'Are you sure you want to add the Task?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Add',
                      onPress: submitForm,
                    },
                  ],
                  { cancelable: false }
                );
              }}
              style={{ marginLeft: 5 }}
            >
              Create Task
            </Button>
          </View>
        </View>
      </Provider>
    </HideKeyboard>
  );
};

export default AddTask;
