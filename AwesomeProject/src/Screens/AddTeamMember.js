import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import TeamItems from '../Components/TeamItems/TeamItems';

import { ToastAndroid } from 'react-native';
const showSuccessToast = () => {
  ToastAndroid.showWithGravity('Fetched Team Members sucessfully  ', ToastAndroid.SHORT, ToastAndroid.TOP);
};
const showBackendErrorToast = () => {
  { ToastAndroid.showWithGravity('Please Try again later !', ToastAndroid.SHORT, ToastAndroid.TOP) }
};
const AddTeamMember = ({ navigation }) => {
  const [members, setMembers] = useState([]);

  const fetchData = () => {
    fetch(
      'https://raw.githubusercontent.com/hindavilande05/testAPI/master/members.json'
    )
      .then((response) => response.json() )
      .then((data) => {
        setMembers(data.members);
        showSuccessToast()
      })
      .catch((error) => {
        console.log(error);
        showBackendErrorToast()
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
const handlePress = () => {
  showSuccessToast()
}
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.Addfullscreen}>
        <View style={styles.AddTeamsubscreen}>
          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={30} color="white" />
            <Text style={styles.AddtitleText} >Add Team Member</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.AddTeamSecondScreen}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 60,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 10,
              paddingLeft: 17,
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <TextInput
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                marginTop: 5,
                width: '80%',
              }}
              placeholder="Search..."
              placeholderTextColor="grey"
            />
            <TouchableOpacity>
              <Icon
                size={20}
                name="search"
                color="#8d98b0"
                style={{
                  backgroundColor: '#f0f4fd',
                  borderRadius: 15,
                  height: 40,
                  width: 40,
                  padding: 10,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          </View>

          {members.map((items) => {
            return (
              <TeamItems
                key={items.id}
                userName={items.userName}
                userDesignation={items.userDesignation}
              />
            );
          })}

          <Button
            style={styles.submitBtn}
            mode="contained"
            onPress={() => navigation.navigate('AddTask')}
          >
            Done
          </Button>
        </View>

      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddTeamMember;
