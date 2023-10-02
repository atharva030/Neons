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
import LinearGradient from 'react-native-linear-gradient';

const designations = [
  'Vice Coordinator',
  'Coordinator',
  'IoT Developer',
  'Android Developer',
  'iOS Developer',
  'Web Developer',
  'Graphic Designer',
  'Content Writer',
  'Video Editor',
  'Social Media Handler',
  'Event Manager',
  'CAD Developer',
  'Other',
];
const GuInfo = ({navigation}) => {
  const route = useRoute();
  const {name, email, photoURL, pass} = route.params;
  const [emil, setEmil] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState(
    designations[null],
  );
  const [signinMethode] = useState('googleSignin');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('this is user email ', email);
    console.log('this is sign in methode ', signinMethode);
    console.log(signinMethode);
  }, []);

  const pickerRef = useRef();
  const handleBackendError = () => {
    ToastComponent({message: 'Sign Up With Google '});
  };
  const handleSubmitRegister = async (
    name,
    email,
    pass,
    phone,
    role,
    selectedDesignation,
    photoURL,
    signinMethode,
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
            Signin_Method: 'google',
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
          // console.log(data);
          setIsLoading(false);
          if (!response.ok) {
            ToastComponent({
              message: data.error || 'Invalid email or password',
            });
          }
          // Login successful, perform any necessary actions (e.g., store user data, navigate to next screen)
          // console.log(data.authToken);
          // console.log(data.Signin_Method);
          // console.log('this data email ', data.email);
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              authToken: data.authToken,
              userRole: data.userRole,
              userName: data.userName,
              userDes: data.designation,
              photoUrl: data.photoUrl,
              email: email,
              Signin_Method: data.signinMethode,
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
      // console.log(userData);
      if (userData) {
        const {userRole, userName, authToken, userDes} = JSON.parse(userData);
        setUserRole(userRole);
        setidName(userName);
        setauthenToken(authToken);
        setuserDes(userDes);
        setphotoUrl(photoURL);

        // console.log(
        //   'This is the one from homescreen',
        //   userRole,
        //   idName,
        //   authenToken,
        //   userDes,
        // );
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

        // console.log(data);
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
  const welco = () => {
    // console.log('welco');
    navigation.navigate('Welcome');
  };

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
              <TouchableOpacity onPress={welco}>
                <View style={styles.accountBack}>
                  <Icon name="chevron-back" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.registerSecondScreen}>
              <Text style={styles.titleText1}>Sign Up with Google</Text>
              <Text style={styles.titleText2}>Create a New Account</Text>
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

              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Full Name</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder=""
                  placeholderTextColor="white"
                  value={name}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Phone</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder=" "
                  placeholderTextColor="white"
                  value={phone}
                  onChangeText={text => setPhone(text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Designation</Text>
                <TouchableOpacity onPress={handleOpenPicker}>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder={
                      selectedDesignation
                        ? selectedDesignation
                        : 'Choose the designation'
                    }
                    placeholderTextColor="white"
                    editable={false}
                  />
                </TouchableOpacity>
                <Picker
                  ref={pickerRef}
                  style={{height: 0, color: 'transparent'}}
                  selectedValue={selectedDesignation}
                  onValueChange={itemValue =>
                    setSelectedDesignation(itemValue)
                  }>
                  {designations.map(designation => (
                    <Picker.Item
                      key={designation}
                      label={designation}
                      value={designation}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Email</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder=""
                  placeholderTextColor="white"
                  value={email}
                />
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
                    <Text style={styles.loginText}>Sign Up</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default GuInfo;
