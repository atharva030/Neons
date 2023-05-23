import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Portal, Button, Modal, TextInput } from 'react-native-paper';
import styles from '../../Styles/Home';
import styles1 from '../../Styles/AddTaskStyle';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 20,
  width: 340,
  marginLeft: 10,
  height: 320,
};

const data = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
];

const TaskItem = (props) => {
  const [statusColor, setStatusColor] = useState('');

  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('0');
  const [textInputCount, setTextInputCount] = useState(0);

  const [isExtended, setIsExtended] = useState(false);

  const renderLabel = () => {
    if (textInputCount || isExtended) {
      return (
        <Text style={[styles.label, isExtended && { color: 'blue' }]}>
          No. of Subtasks
        </Text>
      );
    }
    return null;
  };

  const handleToggleFlex = () => {
    setIsExtended(!isExtended);
  };

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    setTextInputCount(Number(value));
  };

  const renderTextInputs = () => {
    const textInputs = [];
    for (let i = 0; i < textInputCount; i++) {
      textInputs.push(
        <TextInput
          style={styles.textInputStyle}
          key={i}
          placeholder={`SubTask ${i + 1}`}
        />
      );
    }
    return textInputs;
  };

  const handleAddSubTaskClick = () => {
    setIsModal1Visible(true);
  };

  const handleEditClick = () => {
    setIsModal2Visible(true);
  };

  const handleDeleteClick = () => {
    // Implement delete functionality
  };

  const handleStatusUpdate = () => {
    // Implement status update functionality
  };

  const status = props.status;
  useEffect(() => {
    switch (status) {
      case 'URGENT':
        setStatusColor('#FF0000');
        break;
      case 'RUNNING':
        setStatusColor('#55d9a8');
        break;
      case 'STOPPED':
        setStatusColor('#55d9a8');
        break;
      case 'ONGOING':
        setStatusColor('#ff0096');
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <View style={[styles.taskFlex, { height: isExtended ? 170 : 170 + textInputCount * 40  }]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: statusColor, padding: 10 }}>
          {props.status}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleAddSubTaskClick}>
            <Icon
              name="reader"
              color="black"
              size={19}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditClick}>
            <Icon
              name="md-pencil-sharp"
              color="grey"
              size={19}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteClick}>
            <Icon
              name="md-trash-bin"
              color="grey"
              size={20}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.hairline} />
      <View style={styles.mainSecondFlex}>
        <View style={styles.secondflex}>
          <View style={styles.secondSubFlex}>
            <Text style={styles.taskBigText}>{props.title}</Text>
          </View>
          <Text style={styles.taskText}>{props.desc}</Text>
        </View>
        <View style={styles.flexIcon}>
          <Text style={styles.taskText}>{props.time}</Text>
          <TouchableOpacity>
            <Icon name="md-time-outline" size={15} color="grey" />
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Modal
          visible={isModal1Visible}
          onDismiss={() => setIsModal1Visible(false)}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.container}>
            <ScrollView>
              {renderLabel()}
              <Dropdown
                style={[
                  styles.dropdown,
                  isExtended && { borderColor: 'blue' },
                ]}
                selectedValue={selectedOption}
                onValueChange={handleDropdownChange}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isExtended ? 'Select No of subtasks' : '...'}
                searchPlaceholder="Search..."
                value={textInputCount.toString()}
                onFocus={() => setIsExtended(true)}
                onBlur={() => setIsExtended(false)}
                onChange={(item) => {
                  setTextInputCount(Number(item.value));
                  setIsExtended(false);
                }}
              />

              {/* Render TextInput components based on the selected option */}
              {renderTextInputs()}
            </ScrollView>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 290,
              marginLeft: 15,
              marginTop: 25,
            }}
          >
            <Button
              icon="close"
              mode="contained"
              onPress={() => setIsModal1Visible(false)}
            >
              Close
            </Button>
            <Button
              icon="check"
              mode="contained"
              onPress={() => setIsModal1Visible(false)}
              style={{ marginLeft: 5 }}
            >
              Done
            </Button>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={isModal2Visible}
          onDismiss={() => setIsModal2Visible(false)}
          contentContainerStyle={containerStyle}
        >
          <View style={{ marginTop: 10 }}>
            <Text style={styles1.emaillabelStyle}>Edit Task Title</Text>
            <TextInput
              style={[
                styles1.Emailinput,
                { backgroundColor: 'transparent', height: 40 },
              ]}
              placeholder="Team Name"
              placeholderTextColor="#8d98b0"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles1.emaillabelStyle}>Edit Task Description</Text>
            <TextInput
              style={[
                styles1.Emailinput,
                { backgroundColor: 'transparent', height: 40 },
              ]}
              placeholder="Team Description"
              placeholderTextColor="#8d98b0"
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 290,
              marginLeft: 15,
              marginTop: 25,
            }}
          >
            <Button
              icon="close"
              mode="contained"
              onPress={() => setIsModal2Visible(false)}
            >
              Close
            </Button>
            <Button
              icon="check"
              mode="contained"
              onPress={() => setIsModal2Visible(false)}
              style={{ marginLeft: 5 }}
            >
              Done
            </Button>
          </View>
        </Modal>
      </Portal>

      <View>
        {/* Task content */}
        <View style={styles.taskContainer}>
          {/* Task */}
          <View style={styles.taskContent}>
            {/* Task details */}
          </View>

          {/* Toggle button */}
          <TouchableOpacity onPress={handleToggleFlex}>
            {isExtended ? (
              <Icon name="chevron-up-outline" />
            ) : (
              <Icon name="chevron-down-outline" />
            )}
          </TouchableOpacity>
        </View>

        {/* Additional content */}
        <Collapsible collapsed={!isExtended}>
          <View style={styles.additionalContent}>
          </View>
        </Collapsible>
      </View>
    </View>
  );
};

export default TaskItem;