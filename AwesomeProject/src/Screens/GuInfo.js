import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/registerstyles';
import ToastComponent from '../Components/Toast/toast';

const designations = [
  'Software Developer',
  'IoT Developer',
  'Co-ordinator',
  'CAD Developer',
  'Other',
];
const GuInfo = ({navigation}) => {
  const route = useRoute();
  const {name, email, photoURL, pass} = route.params;
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState(
    designations[null],
  );
  const [isLoading, setIsLoading] = useState(false);
  const pickerRef = useRef();
  const handleBackendError = () => {
    ToastComponent({message: 'Check your Network'});
  };
  const handleSubmitRegister = async (
    name,
    email,
    pass,
    phone,
    role,
    selectedDesignation,
    photoURL,
  ) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        'https://tsk-final-backend.vercel.app/api/auth/createuser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            userRole: role,
            designation: selectedDesignation,
            password: pass,
            photoUrl: photoURL,
          }),
        },
      );
      if (response.ok) {
        const gdata = await response.json();
        try {
          if (!email || !pass) {
            ToastComponent({message: 'Please fill in all fields'});
            return;
          }
          setIsLoading(true);
          const response = await fetch(
            'https://tsk-final-backend.vercel.app/api/auth/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: pass,
              }),
            },
          );
          const data = await response.json();
          console.log(data);
          setIsLoading(false);
          if (!response.ok) {
            ToastComponent({
              message: data.error || 'Invalid email or password',
            });
          }
          // Login successful, perform any necessary actions (e.g., store user data, navigate to next screen)
          console.log(data.authToken);
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              authToken: data.authToken,
              userRole: data.userRole,
              userName: data.userName,
              userDes: data.designation,
              photoUrl: data.photoUrl,
            }),
          );
          handleSuccess();
          console.log(data.photoUrl);
          navigation.navigate('NavigationScreen');
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          handleBackendError();
        }
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // handleBackendError()
      return false;
    }
  };
  const getUserRole = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      console.log(userData);
      if (userData) {
        const {userRole, userName, authToken, userDes} = JSON.parse(userData);
        setUserRole(userRole);
        setidName(userName);
        setauthenToken(authToken);
        setuserDes(userDes);
        setphotoUrl(photoURL);
        console.log(
          'This is the one from homescreen',
          userRole,
          idName,
          authenToken,
          userDes,
        );
        // Call fetchTeam() here after setting the authToken
        // fetchTeam();
      }
    } catch (error) {
      console.log('Error while retrieving userRole from AsyncStorage:', error);
    }
  };
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const data = JSON.parse(userData);

        console.log(data);
      } else {
        console.log('User data not found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error while retrieving user data:', error);
    }
  };
  const handleOpenPicker = () => {
    pickerRef.current && pickerRef.current.focus();
  };
  const handleSuccess = () => {
    ToastComponent({message: 'Login Sucessfull'});
  };

  const handleRoleSelection = role => {
    setSelectedRole(role);
  };

  return (
    <ScrollView style={styles.Addfullscreen}>
      <View style={styles.Loginsubscreen}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginTop: 20}}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="white" />
          <Text style={styles.AddtitleText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerSecondScreen}>
        <Text style={styles.titleText}>Create a New Account</Text>

        <View style={styles.roleSelectionContainer}>
          <TouchableOpacity
            style={[
              styles.roleSelectionIconContainer,
              selectedRole === 'ROLE_ADMIN' && styles.selectedRoleContainer,
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
              selectedRole === 'ROLE_MEMBER' && styles.selectedRoleContainer,
            ]}
            onPress={() => handleRoleSelection('ROLE_MEMBER')}>
            <Image
              source={require('../../assets/member.png')}
              style={[
                styles.roleImagemember,
                selectedRole === 'ROLE_MEMBER' && styles.selectedRoleImage,
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

        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Full Name</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            placeholderTextColor="#8d98b0"
            value={name}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Phone</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            placeholderTextColor="#8d98b0"
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Designation</Text>
          <TouchableOpacity onPress={handleOpenPicker}>
            <View style={styles.inputStyle}>
              <Text style={{color: selectedDesignation ? 'black' : '#8d98b0'}}>
                {selectedDesignation || 'Choose the designation'}
              </Text>
              <Picker
                ref={pickerRef}
                style={{height: 0, overflow: 'hidden'}} // Set overflow to 'hidden' to clip the items within the container
                selectedValue={selectedDesignation}
                onValueChange={itemValue => setSelectedDesignation(itemValue)}>
                {designations.map(designation => (
                  <Picker.Item
                    key={designation}
                    label={designation}
                    value={designation}
                  />
                ))}
              </Picker>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Email</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            placeholderTextColor="#8d98b0"
            value={email}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitBtn1, isLoading && styles.buttonDisabled]}
        onPress={() =>
          handleSubmitRegister(
            name,
            email,
            pass,
            phone,
            selectedRole,
            selectedDesignation,
            photoURL,
          )
        }
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <View style={styles.signInContainer}>
            <Text style={styles.loginText}>Enter Details</Text>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default GuInfo;
