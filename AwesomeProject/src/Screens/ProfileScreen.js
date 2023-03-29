import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import styles from '../Styles/ProfileStyle';
import Icon from 'react-native-vector-icons/Ionicons';

import {Avatar} from 'react-native-paper';

import { Avatar } from "react-native-paper";


import profileImage from "../../assets/Image/profile.jpg";
import TeamMember from '../Components/Teams/TeamMember';
import TeamNames from '../Components/Teams/TeamNames';


const Profile = () => {
  return (
    <ScrollView>

      <View style={styles.Addfullscreen}>
        <View style={styles.ProfileSubscreen}>
          <View style={styles.leftIcon}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Icon name="chevron-back" size={30} color="white" />
              <Text style={styles.AddtitleText}>Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bellIcon}>
            <Icon name="notifications-outline" size={30} color="white" />
          </View>
        </View>
        <View style={styles.addSecondScreen}>
          <View style={styles.profileImage}>
            <Avatar.Image
              size={90}
              source={require('../../assets/Image/profile.jpg')}
            />
          </View>

          <View></View>
        </View>
      </View>

        <View style={styles.Addfullscreen}>
            <View style={styles.ProfileSubscreen}>
                <View style={styles.leftIcon}>
                    <TouchableOpacity style={{ flexDirection: 'row'}}>
                        <Icon name="chevron-back" size={30} color="white" />
                        <Text style={styles.AddtitleText}>Profile</Text>    
                    </TouchableOpacity>
                </View>

                <View style={styles.bellIcon}>
                    <Icon name="notifications-outline" size={30} color="white" />
                </View>
            </View>

            <View style={styles.addSecondScreen}>
                <View style={styles.profileImage}>
                    <Avatar.Image size={90} source={require('../../assets/Image/profile.jpg') } avatarStyle={{ borderWidth: 2, borderColor: 'white', borderTopLeftRadius: 1, borderStyle:'solid' }} />
                </View>

                <View> 
                    <Text style={styles.ProfileTitle}>Charles L. Wenner</Text>
                    <Text style={styles.ProfileSubtitle}>UXUI Designer</Text>
                </View>

                <View style={styles.teams}>
                    <Text style={styles.teamLabel}>Team you work now</Text>
                    <TouchableOpacity>
                        <Icon name="add-outline" size={19} style={styles.addIcon}/>
                    </TouchableOpacity>
                </View>

                <TeamNames teamName="Devignedge" teamStatus="Active"  />
                <TeamNames teamName="Next UXUI" />

                <View style={styles.teams}>
                    <Text style={styles.teamLabel}>Work with</Text> 
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.container}>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <TeamMember name="Luther K." designation="Project Manager"/>
                        <TeamMember name="Rosemary J." designation="Software Developer" />
                        <TeamMember name="Jonathan D" designation="Development Manager" />
                    </View>
                </ScrollView>

                <View style={styles.teams}>
                    <TouchableOpacity>
                        <Icon name="settings-outline" size={30} style={styles.setting}/>
                    </TouchableOpacity>
                    <Text style={styles.teamLabel}>Settings</Text>
                </View>
            </View>
        </View>
        
        

    </ScrollView>
  );
};

export default Profile;
