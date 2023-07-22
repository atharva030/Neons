import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { useRef } from 'react';
import { Picker } from '@react-native-picker/picker'; 
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, IconButton, shadow } from 'react-native-paper';
import styles from '../Styles/registerstyles';
import { Image } from 'react-native';
import ToastComponent from '../Components/Toast/toast';
import TaskContext from '../Context/taskContext';
const designations = [
  'Software Developer',
  'IoT Developer',
  'Co-ordinator',
  'CAD Developer',
  'Other',
];
const handleSuccess = () => {
  ToastComponent({ message: 'Registration Sucessfull' });
};

const handleBackendError = () => {
  ToastComponent({ message: '⚠️ Please Try again later!' });
};;
const RegisterScreen = ({ navigation }) => {
  const pickerRef = useRef(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideCnfPassword, setHideCnfPassword] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState(designations[0]);
  const context = useContext(TaskContext)
  const { handleSubmitRegister } = context
  const [isLoading, setIsLoading] = useState(false);
  const handleSuccess = () => {
    ToastComponent({ message: 'Registration Successful' });
  };

  const handleOpenPicker = () => {
    // This function is triggered when the TouchableOpacity is pressed
    // It will open the Picker using refs
    pickerRef.current && pickerRef.current.focus();
  };

  const handleBackendError = (error) => {
    let errorMessage = '⚠️ Please try again later!';

    // Check the error message received from the backend and customize the toast message accordingly
    if (error.message === 'Email already exists') {
      errorMessage = '⚠️ Email already exists';
    } else if (error.message === 'Phone number already exists') {
      errorMessage = '⚠️ Phone number already exists';
    }

    ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  };
  const handlePressRegister = (name, email, password, phone, selectedRole, cnfpassword,selectedDesignation) => {
    // Validate the form fields
    console.log(name, email, password, phone, selectedRole, cnfpassword,selectedDesignation)
    if (!name || !email || !password || !phone || !selectedRole || !cnfpassword || !selectedDesignation) {
      ToastComponent({ message: 'Please fill in all fields' });
      return;
    }

    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastComponent({ message: 'Please enter a valid email address' });
      return;
    }

    // Validate the password length and format
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (password.length < 6 || !passwordRegex.test(password)) {
      ToastComponent({
        message: 'Password must be at least 6 characters long and contain letters, numbers, and symbols',
      });
      return;
    }

    // Validate the password and confirm password match
    if (password !== cnfpassword) {
      ToastComponent({ message: 'Passwords do not match' });
      return;
    }

    // Validate the phone number length
    if (phone.length !== 10) {
      ToastComponent({ message: 'Phone number must be 10 digits long' });
      return;
    }

    setIsLoading(true);
    handleSubmitRegister(name, email, password, phone, selectedRole, cnfpassword,selectedDesignation)
      .then((success) => {
        if (success) {
          handleSuccess();
          navigation.navigate('Login');
        } else {
          // Registration failed, handle the error or display an error message
          handleBackendError(new Error('Registration failed'));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        // An error occurred during registration, handle the error or display an error message
        handleBackendError(error);
      });
  };


  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };
  return (

    <ScrollView style={styles.Addfullscreen}>
      <View style={styles.Loginsubscreen}>
        <TouchableOpacity
          style={{ flexDirection: 'row', marginTop: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={30} color="white" />
          <Text style={styles.AddtitleText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerSecondScreen}>
        <Text style={styles.titleText}>Create a new Account</Text>
        <View style={styles.roleSelectionContainer}>
          <TouchableOpacity
            style={[
              styles.roleSelectionIconContainer,
              selectedRole === 'ROLE_ADMIN' && styles.selectedRoleContainer,
            ]}
            onPress={() => handleRoleSelection('ROLE_ADMIN')}
          >
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
              ]}
            >
              Admin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleSelectionIconContainer,
              selectedRole === 'ROLE_MEMBER' && styles.selectedRoleContainer,
            ]}
            onPress={() => handleRoleSelection('ROLE_MEMBER')}
          >
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
              ]}
            >
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
            onChangeText={text => setName(text)}
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
          {/* The TouchableOpacity wraps the TextInput */}
          <TextInput
            style={styles.inputStyle}
            placeholder={selectedDesignation ? selectedDesignation : 'Choose the designation'} // Set the default placeholder text
            placeholderTextColor="black"
            editable={false} // Disable direct editing of the TextInput
          />
         
        </TouchableOpacity>
        <Picker
          ref={pickerRef} // Assign the ref to the Picker
          style={{ height: 0 }} // Set height to 0 to make it invisible
          selectedValue={selectedDesignation}
          onValueChange={(itemValue) => setSelectedDesignation(itemValue)}
        >
          {designations.map((designation) => (
            <Picker.Item key={designation} label={designation} value={designation} />
          ))}
        </Picker>
      </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Email</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder=""
            placeholderTextColor="#8d98b0"
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
              placeholderTextColor="#8d98b0"
              secureTextEntry={hidePassword}
            />
            <IconButton
              icon={hidePassword ? 'eye-off' : 'eye'}
              color="black"
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
              placeholderTextColor="#8d98b0"
              secureTextEntry={hideCnfPassword}
            />
            <IconButton
              icon={hideCnfPassword ? 'eye-off' : 'eye'}
              color="black"
              size={20}
              onPress={() => setHideCnfPassword(!hideCnfPassword)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.submitBtn1, isLoading && styles.buttonDisabled]}
          onPress={() => handlePressRegister(name, email, password, phone, selectedRole, cnfpassword,selectedDesignation)}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />

          ) : (
            <Text style={styles.loginText}>Register</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInLink}>Log In</Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.signInText}>Sign In/ Register with:</Text> */}
        {/* <View style={styles.socialIconsContainer}>
              <TouchableOpacity onPress={() => console.warn('google Pressed')}>
                <Icon
                  name="ios-logo-google"
                  size={35}
                  color="#5a55ca"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.warn('facebook Pressed')}>
                <Icon name="ios-logo-facebook" size={35} color="#5a55ca" />
              </TouchableOpacity>
            </View> */}
      </View>
    </ScrollView>


  );
};



export default RegisterScreen;
