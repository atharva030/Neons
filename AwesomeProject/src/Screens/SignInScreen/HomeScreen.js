import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import avatar from '../../../assets/Image/profile.jpg';
import styles from '../../Styles/Home';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import TaskItem from '../../Components/TaskItem';

const HomeScreen = () => {
  let datesWhitelist = [{
    start: moment(),
    end: moment().add(3, 'days')  // total 1 days enabled
  }];
  // let datesBlacklist = [ moment().add(1, 'days') ]; // 1 day disabled
  return (
    <View style={styles.fullscreen}>
      <View style={styles.outer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText]}>Task</Text>
          <Image source={avatar} style={styles.logo} />
        </View>
        <View style={styles.dayContainer}>
          <View style={styles.innerdayContainer}>
            <Text style={[styles.dateText]}>May 01, 2023</Text>
            <Text style={[styles.titleText]}>Today</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addText}>+ Add Task</Text>
          </TouchableOpacity>
        </View>
            <CalendarStrip
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'black'}}
                    style={styles.calenderStyle}
                    calendarHeaderStyle={{color: 'black'}}
                    // calendarColor={'#7743CE'}
                    dateNumberStyle={{color: 'black'}}
                    dateNameStyle={{color: 'grey'}}
                    highlightDateNumberStyle={{color: 'yellow'}}
                    highlightDateNameStyle={{color: 'yellow'}}
                    disabledDateNameStyle={{color: 'black'}}
                    disabledDateNumberStyle={{color: 'black'}}
                    datesWhitelist={datesWhitelist}
                    // datesBlacklist={datesBlacklist}
                    // iconLeft={require('./img/left-arrow.png')}
                    // iconRight={require('./img/right-arrow.png')}
                    iconContainer={{flex: 0.1}}
                />
    <View style={styles.taskFlex}>
      <Text style={styles.firstflex}>URGENT</Text>
      {/* <hr></hr> */}
      <View style={styles.hairline} />
      <View style={styles.secondflex}>
        <View style={styles.secondSubFlex}>
          <Text style={styles.taskText}>New Web UI Design Project</Text>
          <Text style={styles.taskText}>ICON</Text>
        </View>
        <Text style={styles.taskText}>Website UI Design</Text>
      </View>
    </View>

      </View>
  
    </View>
    
  );
};

export default HomeScreen;
