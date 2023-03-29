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
import {Button} from 'react-native-paper';
import TeamItems from '../Components/TeamItems/TeamItems';
const AddTeamMember = ({navigation}) => {
  return (
    <ScrollView style={styles.Addfullscreen}>
      <View style={styles.AddTeamsubscreen}>
        <TouchableOpacity style={{flexDirection: 'row', marginTop: 20}}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={30} color="white" />
          <Text style={styles.AddtitleText}>Add Team Member</Text>
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
            // padding: 12,
            paddingLeft: 17,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
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

        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />
        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />
        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />
        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />
        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />
        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />
        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />
        <TeamItems userName="John Wick" userDesignation="UI/UX Designer" />

        <Button
          style={styles.submitBtn}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Done
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddTeamMember;
