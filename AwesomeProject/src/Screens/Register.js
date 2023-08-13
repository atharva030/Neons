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
import React, {useContext, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'react-native-paper';
import styles from '../Styles/registerstyles';
import {Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ToastComponent from '../Components/Toast/toast';
import TaskContext from '../Context/taskContext';
import {statusCodes} from 'react-native-google-signin';

const designations = [
  'Software Developer',
  'IoT Developer',
  'Co-ordinator',
  'CAD Developer',
  'Other',
];

const handleSuccess = () => {
  ToastComponent({message: 'Registration Successful'});
};

const handleBackendError = () => {
  ToastComponent({message: '⚠️ Please Try again later!'});
};

const RegisterScreen = ({navigation}) => {
  const pickerRef = useRef(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideCnfPassword, setHideCnfPassword] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState(
    designations[0],
  );
  const context = useContext(TaskContext);
  const {handleSubmitRegister} = context;
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const selectedRole = route.params.selectedRole;

  const isLoginDisabled = !name.trim() || !email.trim() || !password.trim() || !phone.trim() || !cnfpassword.trim() || !selectedDesignation.trim();

  useEffect(() => {
  console.log(selectedRole);
  }, [])
  

  const handleOpenPicker = () => {
    pickerRef.current && pickerRef.current.focus();
  };

  const handleBackendError = error => {
    let errorMessage = '⚠️ Please try again later!';

    if (error.message === 'Email already exists') {
      errorMessage = '⚠️ Email already exists';
    } else if (error.message === 'Phone number already exists') {
      errorMessage = '⚠️ Phone number already exists';
    }

    ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  };

  const handlePressRegister = (
    name,
    email,
    password,
    phone,
    selectedRole,
    cnfpassword,
    selectedDesignation,
  ) => {
    console.log(
      name,
      email,
      password,
      phone,
      selectedRole,
      cnfpassword,
      selectedDesignation,
    );
    if (
      !name ||
      !email |
      !password ||
      !phone ||
      !selectedRole ||
      !cnfpassword ||
      !selectedDesignation
    ) {
      ToastComponent({message: 'Please fill in all fields'});
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastComponent({message: 'Please enter a valid email address'});
      return;
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (password.length < 6 || !passwordRegex.test(password)) {
      ToastComponent({
        message:
          'Password must be at least 6 characters long and contain letters, numbers, and symbols',
      });
      return;
    }

    if (password !== cnfpassword) {
      ToastComponent({message: 'Passwords do not match'});
      return;
    }

    if (phone.length !== 10) {
      ToastComponent({message: 'Phone number must be 10 digits long'});
      return;
    }

    setIsLoading(true);
    handleSubmitRegister(
      name,
      email,
      password,
      phone,
      selectedRole,
      cnfpassword,
      selectedDesignation,
    )
      .then(success => {
        if (success) {
          handleSuccess();
          navigation.navigate('Login');
        } else {
          handleBackendError(new Error('Registration failed'));
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
        handleBackendError(error);
      });
  };

  const handleRoleSelection = role => {
    setSelectedRole(role);
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.accountBack}>
                  <Icon name="chevron-back" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.registerSecondScreen}>
              <Text style={styles.titleText1}>Register</Text>
              <Text style={styles.titleText2}>Create a new Account</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Full Name</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder=" "
                  placeholderTextColor="white"
                  value={name}
                onChangeText={text => setName(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Phone</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder=""
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
              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Email</Text>
                <TextInput
                  style={styles.inputStyle}
                  placeholder=""
                  placeholderTextColor="white"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInputStyle}
                    value={password}
                    onChangeText={setPassword}
                    placeholder=""
                    placeholderTextColor="white"
                    secureTextEntry={hidePassword}
                  />
                  <IconButton
                    icon={hidePassword ? 'eye-off' : 'eye'}
                    color="#70686a"
                    size={20}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Confirm Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInputStyle}
                    value={cnfpassword}
                    onChangeText={text => setCnfPassword(text)}
                    placeholderTextColor="white"
                    secureTextEntry={hideCnfPassword}
                  />
                  <IconButton
                    icon={hideCnfPassword ? 'eye-off' : 'eye'}
                    color="#70686a"
                    size={20}
                    onPress={() => setHideCnfPassword(!hideCnfPassword)}
                  />
                </View>
              </View>
            

              <TouchableOpacity
              style={[styles.submitBtn1, isLoginDisabled && styles.buttonDisabled, isLoading && styles.buttonDisabled ]}
             
                onPress={() =>
                  handlePressRegister(
                    name,
                    email,
                    password,
                    phone,
                    selectedRole,
                    cnfpassword,
                    selectedDesignation,
                  )
                }
              disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={[styles.loginText, isLoginDisabled && styles.buttonTextDisabled]}>Register</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.signInLink}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;
