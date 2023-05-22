import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../../Styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState, useEffect} from 'react';
import {Portal, Button, Modal, TextInput, ScrollView} from 'react-native-paper';
import styles1 from '../../Styles/AddTaskStyle';


import {Dropdown} from 'react-native-element-dropdown';

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 20,
  width: 340,
  marginLeft: 10,
  height: 320,
};

const data = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
];

const TaskItem = props => {
  const [statusColor, setStatusColor] = useState('');

  const [isModal1Visible, setIsModal1Visible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('0');
  const [textInputCount, setTextInputCount] = useState(0);

  //for extend and shrink the subtask downward arrow
  const [isExtended, setIsExtended] = useState(false);

  // const [selectedValue, setSelectedValue] = useState('');
  // const [textInputCount, setTextInputCount] = useState(0);

  const [textInputs, setTextInputs] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          No. of Subtasks
        </Text>
      );
    }
    return null;
  };

  const handleToggleFlex = () => {
    setIsExtended(!isExtended);
  };

  // const handleDropdownChange = itemValue => {
  //   setSelectedValue(itemValue);
  //   setTextInputCount(0);
  //   setTextInputs([]);
  // };

  const handleDropdownChange = value => {
    setSelectedOption(value);
    setTextInputCount(Number(value));
  };

  const renderTextInputs = () => {
    console.log(textInputCount);
    const textInputs = [];
    for (let i = 0; i < textInputCount; i++) {
      textInputs.push(
        <TextInput
          style={styles.textInputStyle}
          key={i}
          placeholder={`SubTask ${i + 1}`}
        />,
      );
    }
    return textInputs;
  };

  const handleAddTextInput = () => {
    setTextInputCount(textInputCount + 1);
    setTextInputs([...textInputs, `TextInput ${textInputCount + 1}`]);
  };

  const handleModal1Close = () => {
    setIsModal1Visible(false);
  };
  const handleModal2Close = () => {
    setIsModal2Visible(false);
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
    <View style={styles.taskFlex}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: `${statusColor}`, padding: 10}}>
          {props.status}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handleAddSubTaskClick}>
            <Icon
              name="reader"
              color="black"
              size={19}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditClick}>
            <Icon
              name="md-pencil-sharp"
              color="grey"
              size={19}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteClick}>
            <Icon
              name="md-trash-bin"
              color="grey"
              size={20}
              style={{marginRight: 10}}
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
          {/* <View style={styles.iconStyle}> */}
          <Text style={styles.taskText}>{props.time}</Text>
          <TouchableOpacity>
            <Icon name="md-time-outline" size={15} color="grey" />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
      <Portal>
        <Modal
          visible={isModal1Visible}
          onDismiss={handleModal1Close}
          contentContainerStyle={containerStyle}>
          {/* <View style={{ marginTop: 10 }}>
            <Text style={styles1.emaillabelStyle}> Title</Text>
            <TextInput
              style={[styles1.Emailinput, { backgroundColor: 'transparent', height: 40 }]}
              placeholder="Team Name"
              placeholderTextColor="#8d98b0"/>
          </View> */}

          <View style={styles.container}>
            <ScrollView>
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
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
                placeholder={!isFocus ? 'Select No of subtasks' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setTextInputCount(item.value);
                  setIsFocus(false);
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
            }}>
            <Button icon="close" mode="contained" onPress={handleModal1Close}>
              Close
            </Button>
            <Button
              icon="check"
              mode="contained"
              onPress={() => setIsModal1Visible(false)}
              style={{marginLeft: 5}}>
              Done
            </Button>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={isModal2Visible}
          onDismiss={handleModal2Close}
          contentContainerStyle={containerStyle}>
          <View style={{marginTop: 10}}>
            <Text style={styles1.emaillabelStyle}>Edit Task Title</Text>
            <TextInput
              style={[
                styles1.Emailinput,
                {backgroundColor: 'transparent', height: 40},
              ]}
              placeholder="Team Name"
              placeholderTextColor="#8d98b0"
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles1.emaillabelStyle}>Edit Task Description</Text>
            <TextInput
              style={[
                styles1.Emailinput,
                {backgroundColor: 'transparent', height: 40},
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
            }}>
            <Button icon="close" mode="contained" onPress={handleModal2Close}>
              Close
            </Button>
            <Button
              icon="check"
              mode="contained"
              onPress={() => setIsModal2Visible(false)}
              style={{marginLeft: 5}}>
              Done
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default TaskItem;
