import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import { Modal, Portal, Provider, Button, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Time from '../Components/Time/Time';
import styles from '../Styles/AddTaskStyle';

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
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const hideConfirmationModal = () => {
    setConfirmationVisible(false);
  };

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

  const submitForm = () => {
    if (taskName.trim() !== '') {
      setConfirmationVisible(true);
    }
  };

  const addTaskdb = () => {
    // console.log(email, password)
    // setSpinner(true)
    fetch(`http://192.168.1.6:8888/api/task/${teamIdByItem}/tasks`, {
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
      .catch((error) => console.log(error));

    hideAddModal();
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

          {/* <Modal
            visible={confirmationVisible}
            onDismiss={hideConfirmationModal}
            contentContainerStyle={styles.confirmationModal}
          >
            <Text>Task Name: {taskName}</Text>
            <Text>Start Date: {stDate}</Text>
            <Text>End Date: {endDate}</Text>
            <Text>Description: {description}</Text>
            <Text>Status: {status}</Text>

            <Button onPress={submitForm} mode="contained">
              Confirm
            </Button>

            <Button onPress={hideConfirmationModal} mode="contained">
              Cancel
            </Button>
          </Modal> */}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 290,
              marginLeft: 15,
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
              onPress={submitForm}
              style={{ marginLeft: 5 }}
            >
              Create Task
            </Button>
          </View>
        </View>

        <Modal
          visible={confirmationVisible}
          onDismiss={hideConfirmationModal}
          contentContainerStyle={styles.confirmationModal}
        >
          <Text style={styles.confirmationText}>
            Are you sure you want to assign a task?
          </Text>

          <View style={styles.buttonContainer}>
            <Button onPress={addTaskdb} mode="contained" style={styles.confirmButton}>
              Confirm
            </Button>

            <Button onPress={hideConfirmationModal} mode="contained" style={styles.cancelButton}>
              Cancel
            </Button>
          </View>
        </Modal>
      </Provider>
    </HideKeyboard>
  );
};

export default AddTask;
