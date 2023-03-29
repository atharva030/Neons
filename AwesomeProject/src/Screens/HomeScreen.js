import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Home';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import TaskItem from './TaskItem';
import {Modal, Portal, Button, Provider} from 'react-native-paper';

import AddTask from './AddTask';

const HomeScreen = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(3, 'days'), // total 1 days enabled
    },
  ];
  // let datesBlacklist = [ moment().add(1, 'days') ]; // 1 day disabled


  return (
    <ScrollView>
      <View style={styles.fullscreen}>
        <Modal
          onDismiss={hideModal}
          visible={visible}
          contentContainerStyle={containerStyle}
          style={{color: 'black'}}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>

        <View style={styles.outer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText]}>Task</Text>
            <TouchableOpacity>
              <Image source={avatar} style={styles.logo} />
            </TouchableOpacity>
          </View>
          <View style={styles.dayContainer}>
            <View style={styles.innerdayContainer}>
              <Text style={[styles.dateText]}>May 01, 2023</Text>
              <Text style={[styles.titleText]}>Today</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
              <Text style={styles.addText}>+ Add Task</Text>
            </TouchableOpacity>
          </View>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{
              type: 'border',
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: 'black',
            }}
            style={styles.calenderStyle}
            calendarHeaderStyle={{color: 'black'}}
            // calendarColor={'#7743CE'}
            dateNumberStyle={{color: 'black'}}
            dateNameStyle={{color: '#8d98b0'}}
            highlightDateNumberStyle={{color: '#5a55ca'}}
            highlightDateNameStyle={{color: '#5a55ca'}}
            disabledDateNameStyle={{color: 'black'}}
            disabledDateNumberStyle={{color: 'black'}}
            datesWhitelist={datesWhitelist}
            // datesBlacklist={datesBlacklist}
            // iconLeft={require('./img/left-arrow.png')}
            // iconRight={require('./img/right-arrow.png')}
            iconContainer={{flex: 0.1}}
          />
          <TaskItem
            type="URGENT"
            color="red"
            desc="Website UI Design for $500"
            persons="3"
            title="New Web UI Design Project"
            time="10-11 AM"
            showModal={showModal}
          />
          <TaskItem
            type="RUNNING"
            color="#55d9a8"
            desc="Website UI Design for $500"
            persons="5"
            title="New Web UI Design Project"
            time="9-11 AM"
          />
          <TaskItem
            type="ONGOING"
            color="#ff0096"
            desc="Website UI Design for $500"
            persons="5"
            title="New Web UI Design Project"
            time="9-11 AM"
          />
          <TaskItem
            type="STOPPED"
            color="#0067fb"
            desc="Website UI Design for $500"
            persons="5"
            title="New Web UI Design Project"
            time="9-11 AM"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
