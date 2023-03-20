import {View, Text} from 'react-native';
import React from 'react';
import styles from '../Styles/Home';
const TaskItem = () => {
  return (
    <View style={styles.taskFlex}>
      <Text style={styles.firstflex}>URGENT</Text>
      {/* <hr></hr> */}
      <View style={styles.secondflex}>
        <View style={styles.seondSubFlex}>
          <Text style={styles.taskBigText}> New Web UI Design Project</Text>
          <Text>ICON</Text>
        </View>
        <Text>Websiten UI Design</Text>
      </View>
    </View>
  );
};

export default TaskItem;
