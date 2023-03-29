import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal, Portal, Button, Provider} from 'react-native-paper';
const TaskItem = props => {

  return (
    <Provider>
      <View style={styles.taskFlex}>
        <Text style={{color: props.color, padding: 10}}>{props.type}</Text>
        {/* <hr></hr> */}
        <View style={styles.hairline} />
        <View style={styles.mainSecondFlex}>
          <View style={styles.secondflex}>
            <View style={styles.secondSubFlex}>
              <Text style={styles.taskBigText}>{props.title}</Text>
              {/* <Text style={styles.taskText}>O</Text> */}
              <TouchableOpacity>
                <Icon
                  name="md-ellipsis-vertical"
                  size={15}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.taskText}>{props.desc}</Text>
            <Portal>
              <Button style={{marginTop: 30}} onPress={props.showModal}>
                Show
              </Button>
            </Portal>
          </View>
          <View style={styles.flexIcon}>
            <View style={styles.iconStyle}>
              <TouchableOpacity>
                <Icon name="md-time-outline" size={15} color="grey" />
              </TouchableOpacity>
              <Text style={styles.taskText}>{props.time}</Text>
            </View>
            <View style={styles.iconStyle}>
              <TouchableOpacity>
                <Icon name="md-person" size={15} color="grey" />
              </TouchableOpacity>
              <Text style={styles.taskText}>{props.persons} Persons</Text>
            </View>
          </View>
        </View>
      </View>
    </Provider>
  );
};

export default TaskItem;
