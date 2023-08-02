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
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState(
    designations[0],
  );
  const context = useContext(TaskContext);
  const {handleSubmitRegister} = context;
  const [isLoading, setIsLoading] = useState(false);

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
      !email ||
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

  GoogleSignin.configure({
    scopes: ['email'],
    webClientId:
      '461468934097-cfeol86ft1lq1gmsr5iqjsija3fipfp6.apps.googleusercontent.com',
    offlineAccess: true,
  });
  const [user, setUser] = useState(false);
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const currentUser = auth().currentUser;
      setUser(currentUser);
      console.log(
        'This is user ',
        currentUser.email,
        currentUser.displayName,
        currentUser.photoURL,
        currentUser.uid,
      );

      if (currentUser.email == null) {
        Alert.alert('Please provide your name and Email to continue');
      } else {
        handleNavigation(currentUser);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the sign-in flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in operation is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available or outdated');
      } else {
        console.log(
          'Something went wrong with Google Sign-In: ',
          error.message,
        );
      }
    }
  };

  const handleNavigation = user => {
    navigation.navigate('GuInfo', {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      pass: user.uid,
    });
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
        <Text style={styles.titleText}>Create a new Account</Text>
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
            placeholder=" "
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
            <TextInput
              style={styles.inputStyle}
              placeholder={
                selectedDesignation
                  ? selectedDesignation
                  : 'Choose the designation'
              }
              placeholderTextColor="black"
              editable={false}
            />
          </TouchableOpacity>
          <Picker
            ref={pickerRef}
            style={{height: 0}}
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
            <Text style={styles.loginText}>Register</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInLink}>Log In</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signInText}>Sign In/ Register with:</Text>
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity onPress={handleSignIn}>
            <Icon
              name="ios-logo-google"
              size={35}
              color="#5a55ca"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
