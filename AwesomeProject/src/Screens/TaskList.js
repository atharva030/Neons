import React, { useEffect, useState } from 'react';
import { View, Text, Image, RefreshControl, ScrollView } from 'react-native';
import avatar from '../../assets/Image/profile.jpg';
import styles from '../Styles/Home';
import styles1 from '../Styles/AddTaskStyle';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import TaskItem from '../Components/Items/TaskItem';
import { Modal, Button } from 'react-native-paper';
import { FAB, Provider, DefaultTheme, Portal, TextInput } from 'react-native-paper';
import AddTask from './AddTask';
import TeamMember from '../Components/Teams/TeamMember';
const currentDate = moment().format('MMMM DD, YYYY');

const HomeScreen = ({ navigation }) => {

  const [selectedIds, setSelectedIds] = useState([]);

  const [memberTeam, setmemberTeam] = useState(false)
  const [resultTeamMemberData, setresultTeamMemberData] = useState("")
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([])
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerMemberStyle = { backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 10, borderRadius: 20, width: 330, marginLeft: 10, height: 600 };
  const containerStyle = { backgroundColor: 'white', paddingTop: 20, borderRadius: 20, width: 340, marginLeft: 10, height: 370 };

  const handleSubmit = () => {
    hideModal();
    handleAddMember();
  };

  const fetchMembers = async () => {
    // console.log("Hey")
    fetch('http://192.168.0.115:8888/api/members/getuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setresultTeamMemberData(data)

        console.log(resultTeamMemberData); // this will log the array of objects returned by the API
        // you can perform any additional logic here based on the returned data
        //   navigation.navigate('NavigationScreen');
        // for (let i = 0; i < resultTeamData.length; i++) {
        //     const membersSize = resultTeamData[i].members.length;
        //     console.log(`The size of members array in ${data[i].name} is ${membersSize}`);
        // }
      })
      .catch(err => {
        console.log(err);
      });

  }

  const fetchData = () => {
    fetch('https://raw.githubusercontent.com/hindavilande05/testAPI/master/tasks.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTasks(data.tasks)
      })
  }
  // console.log("Final array",role)
  //This is sending the Members ID to the Backend 
  const handleAddMember = async() => {
    fetch("http://192.168.0.115:8888/api/team/64443be2840258d5b70397b6", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NDExNWE4OWM2YzBkNWVkM2NkZjk1In0sImlhdCI6MTY4MjQyMjY1Mn0.HSdE9BWdLaBk5nydzXeGoEDRCznGqL3re_IxDctwGHE"
      },
      body: JSON.stringify({
        selectedIds: selectedIds,
      }),
    })
      .then((response) => {
        console.log("Response status code:", response.status);
        return response.text();
      })
      .then((text) => {
        console.log("Response body text:", text);
        try {
          const data = JSON.parse(text);
          console.log(data);
        } catch (err) {
          console.log("Error parsing JSON:", err.message);
        }
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  };


  useEffect(() => {
    // fetchData()
    fetchMembers()
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
          <Modal visible={memberTeam} onDismiss={() => setmemberTeam(false)} contentContainerStyle={containerMemberStyle} >
            <ScrollView>
              {resultTeamMemberData.length === 0 ? (
                (

                  <View style={{ width: 360, height: 500, display: 'flex', alignItems: 'center' }}>
                    <Text style={{ color: 'grey', fontSize: 20, padding: 20, marginTop: 140, textAlign: 'center', letterSpacing: 1.5 }}>You don't have Teams to Display</Text>
                  </View>
                )
              ) : (
                resultTeamMemberData.map((items) => (
                  <TeamMember
                    name={items.name}
                    designation={items.designation}
                    id={items._id}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                  />
                ))
              )}

            </ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', width: 290, marginTop: 15, marginBottom: 10 }}>
              <Button icon="close" mode="contained" onPress={() => setmemberTeam(false)} style={{ marginLeft: 25 }}>
                Close
              </Button>
              <Button icon="check" mode="contained" onPress={handleSubmit} style={{ marginLeft: 5 }}>
                Add Member
              </Button>
            </View>
          </Modal>
        </Portal>
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
              {/* <TouchableOpacity style={styles.addButton} onPress={showModal}>
                <Text style={styles.addText}>+ Add Task</Text>
              </TouchableOpacity> */}
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
            fabStyle={styles.fab}
            visible
            icon={open ? 'chevron-down' : 'plus'}
            actions={[
              {
                icon: 'plus',
                label: 'Add Task',
                onPress: () => showModal(),
              },
              {
                icon: 'plus',
                label: 'Add Team Members',
                onPress: () => setmemberTeam(true),
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