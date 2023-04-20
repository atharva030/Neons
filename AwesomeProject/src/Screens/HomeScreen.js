import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Home';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import TaskItem from './TaskItem';
import {Modal, Portal, Button, Provider} from 'react-native-paper';

import AddTask from './AddTask';

const HomeScreen = ({navigation}) => {

  const [tasks, setTasks] = useState([])

  const fetchData = () => {
    fetch('https://raw.githubusercontent.com/hindavilande05/testAPI/master/tasks.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTasks(data.tasks)
      })
  }
console.log(tasks);

  useEffect(() => {
    fetchData()
  }, [])

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
    
          {tasks.map((items)=>{
            return(
              <TaskItem
                status={items.status}
                desc={items.desc}
                person={items.person}
                title={items.title}
                time={items.time}
              />)
            })}
          
        </View>
      </View>
    </ScrollView>
    
  );
};

export default HomeScreen;