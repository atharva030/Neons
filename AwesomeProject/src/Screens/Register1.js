
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import {useRef} from 'react';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'react-native-paper';
import styles from '../Styles/registerstyles';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ToastComponent from '../Components/Toast/toast';
import TaskContext from '../Context/taskContext';
import {statusCodes} from 'react-native-google-signin';

const Register1 = ({navigation}) => {
  const [selectedRole, setSelectedRole] = useState('');
  return (
    <LinearGradient
      colors={['#1e010b', '#001314']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={{height: '100%'}}>
      <View>
      <ScrollView>
        <View style={styles.Addfullscreen}>
          <View style={styles.Loginsubscreen}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.accountBack}>
                <Icon name="chevron-back" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.registerSecondScreen}>
            <Text style={styles.titleText1}>Register</Text>
            <Text style={styles.titleText2}>Create a new Account</Text>
<View style={{marginTop:"30"}}>
              <Text style={[styles.labelStyle]}>Choose Your Role</Text>
              <View style={styles.roleSelectionContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleSelectionIconContainer,
                    selectedRole === 'ROLE_ADMIN' &&
                      styles.selectedRoleContainer,
                  ]}
                  onPress={() => handleRoleSelection('ROLE_ADMIN')}>
                  <Image
                    source={require('../../assets/admin.png')}
                    style={[
                      styles.roleImageadmin,
                      selectedRole === 'ROLE_ADMIN' && styles.selectedRoleImage,
                    ]}
                  />
                  <Text
                    style={[
                      styles.roleSelectionText,
                      selectedRole === 'ROLE_ADMIN' && styles.selectedRoleText,
                    ]}>
                    Admin
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.roleSelectionIconContainer,
                    selectedRole === 'ROLE_MEMBER' &&
                      styles.selectedRoleContainer,
                  ]}
                  onPress={() => handleRoleSelection('ROLE_MEMBER')}>
                  <Image
                    source={require('../../assets/member.png')}
                    style={[
                      styles.roleImagemember,
                      selectedRole === 'ROLE_MEMBER' &&
                        styles.selectedRoleImage,
                    ]}
                  />
                  <Text
                    style={[
                      styles.roleSelectionText,
                      selectedRole === 'ROLE_MEMBER' && styles.selectedRoleText,
                    ]}>
                    Member
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
            </View>
          
        </ScrollView>
      </View>
    
    </LinearGradient>
  );
};

export default Register1;
