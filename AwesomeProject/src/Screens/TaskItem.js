import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../Styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';
const TaskItem = props => {
  return (
    <View style={styles.taskFlex}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{color: props.color, padding: 10}}>{props.type}</Text>
        <View style={{flexDirection:'row'}}>
          <Icon name="md-pencil-sharp" color='grey' size={19} style={{marginRight:10}}/>
          <Icon name="md-trash-bin" color='grey' size={20} style={{marginRight:10}}/>

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
  );
};

export default TaskItem;
