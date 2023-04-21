import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../../Styles/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
const TaskItem = props => {
  // const [statuscolor, setStatuscolor] = useState("")
   
  //   if(props.status== "URGENT"){
  //     setStatuscolor("FF0000")
  //   }
  //   else if(props.status == "RUNNING"){
  //     setStatuscolor("#55d9a8")

  //   }
  //   else if(props.status == "ONGOING"){
  //     setStatuscolor("#ff0096")
  //   }
  //   else{
  //     setStatuscolor("0067fb")
  //   }

  const [statusColor, setStatusColor] = useState("");
  status = props.status;
  console.log(status)
  useEffect(() => {
    switch (status) {
      case "URGENT":
        setStatusColor('#FF0000');
        break;
      case "RUNNING":
        setStatusColor('#55d9a8');
        break;
      case "STOPPED":
        setStatusColor('#55d9a8');
        break;
      case "ONGOING":
          setStatusColor('#ff0096');
          break;
      default:
        break;
    }
    
  }, [status]);
  
  return (
    
    <View style={styles.taskFlex}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        
        <Text style={{color: `${statusColor}` , padding: 10}}>{props.status}</Text>
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
            <Text style={styles.taskText}>{props.person} Persons</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskItem;