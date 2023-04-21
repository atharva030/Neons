import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Home';
import styles1 from '../Styles/AddTaskStyle';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import TaskItem from '../Components/Items/TaskItem';
import { Modal, Button } from 'react-native-paper';
import { FAB, Provider, DefaultTheme, Portal, TextInput } from 'react-native-paper';
import AddTask from './AddTask';
const currentDate = moment().format('MMMM DD, YYYY');
const HomeScreen = ({ navigation }) => {

  const [visible, setVisible] = React.useState(false);
  const [tasks, setTasks] = useState([])
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', paddingTop: 20, borderRadius: 20, width: 340, marginLeft: 10, height: 500 };

  const handleSubmit = () => {
    hideModal();
  };

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
    <Provider theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, accent: 'transparent' } }}>
      <ScrollView>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >

            <AddTask />
            <View style={{ display: 'flex', flexDirection: 'row', width: 290, marginLeft: 15, marginBottom: 15 }}>
              <Button icon="close" mode="contained" onPress={hideModal} style={{ marginLeft: 25 }}>
                Close
              </Button>
              <Button icon="check" mode="contained" onPress={handleSubmit} style={{ marginLeft: 5 }}>
                Create Task
              </Button>
            </View>
          </Modal>
        </Portal>
        <View style={[styles.fullscreen]}>
          <View style={styles.outer}>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText]}>Tasks</Text>
            </View>
            <View style={styles.dayContainer}>
              <View style={styles.innerdayContainer}>
                <Text style={[styles.dateText]}>{currentDate}</Text>
              </View>
                <TouchableOpacity style={styles.addButton} onPress={showModal}>
                <Text style={styles.addText}>+ Add Task</Text>
              </TouchableOpacity>
            
            </View>
            <CalendarStrip
              onDateSelected={(date) => console.log(date)}
              calendarAnimation={{ type: 'sequence', duration: 30 }}
              daySelectionAnimation={{
                type: 'border',
                duration: 200,
                borderWidth: 1,
                borderHighlightColor: 'black',
              }}
              style={styles.calenderStyle}
              calendarHeaderStyle={{ color: 'black' }}
              // calendarColor={'#7743CE'}
              dateNumberStyle={{ color: 'black' }}
              dateNameStyle={{ color: '#8d98b0' }}
              highlightDateNumberStyle={{ color: '#5a55ca' }}
              highlightDateNameStyle={{ color: '#5a55ca' }}
              disabledDateNameStyle={{ color: 'black' }}
              disabledDateNumberStyle={{ color: 'black' }}
              datesWhitelist={datesWhitelist}
              // datesBlacklist={datesBlacklist}
              // iconLeft={require('./img/left-arrow.png')}
              // iconRight={require('./img/right-arrow.png')}
              iconContainer={{ flex: 0.1 }}
            />

          </View>
          {tasks.length === 0 ? (
            (

              <View style={{ width: 360, height: 500, display: 'flex', alignItems: 'center' }}>
                <Text style={{ color: 'grey', fontSize: 20, padding: 20, marginTop: 100, textAlign: 'center', letterSpacing: 1.5 }}>You don't have Tasks to Display</Text>
                <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')} style={{ width: 100 }}>
                  Add Task
                </Button>
              </View>
            )
          ) : tasks.map((items) => {
            return (
              <TaskItem
                status={items.status}
                desc={items.desc}
                person={items.person}
                title={items.title}
                time={items.time}
              />)
          })}

        </View>
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? 'chevron-down' : 'plus'}
            actions={[
              {
                icon: 'plus',
                label: 'Add Task',
                onPress: () => showModal(),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
            overlayColor='transparent'
          />
        </Portal>
      </ScrollView>
    </Provider>
  );
};

export default HomeScreen;