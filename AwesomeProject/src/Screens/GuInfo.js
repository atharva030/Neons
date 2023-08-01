import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import styles from '../Styles/registerstyles';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const designations = [
  'Software Developer',
  'IoT Developer',
  'Co-ordinator',
  'CAD Developer',
  'Other',
];

const GuInfo = ({ navigation }) => {

  
  
  const route = useRoute();
  const { name, email, photoURL, pass } = route.params;
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState(designations[0]);
  const [isLoading, setIsLoading] = useState(false);

  const pickerRef = useRef(); // Add this line to create the pickerRef


  useEffect(() => {
    console.log('This is user ', name, email, photoURL, pass);
  }, []);

  const handleSubmitRegister = async (name, email, pass, phone, role, selectedDesignation, photoURL) => {
    try {
      console.log("This is from taskstack", name, email, pass, phone, role);
     
        // setSpinner(true);
        const response = await fetch('https://tsk-final-backend.vercel.app/api/auth/createuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            userRole: role,
            designation: selectedDesignation,
            password: pass,
            photoUrl: photoURL

          }),
        });

        const res = await response.json();
        console.log(res);
        // await AsyncStorage.setItem('auth-token', res.authToken);
        // const auth = await AsyncStorage.getItem('auth-token');
        // console.log(auth);

        return true;
     
    } catch (error) {
      console.error(error);
      // handleBackendError()
      return false;
    }
  };
  const handleOpenPicker = () => {
    // This function is triggered when the TouchableOpacity is pressed
    // It will open the Picker using refs
    pickerRef.current && pickerRef.current.focus();
  };

  const handleSuccess = () => {
    // Define your success handling logic here or use a toast component to display success messages.
  };

  const handlePressRegister = (
    name,
    email,
    pass,
    phone,
    selectedRole,
    selectedDesignation,
  ) => {
    // Validate the form fields
    console.log(name, email, pass, phone, selectedRole, selectedDesignation);
    if (
      !name ||
      !email ||
      !phone ||
      !selectedRole ||
      !selectedDesignation
    ) {
      // ToastComponent({ message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    handleSubmitRegister(name, email, pass, phone, selectedRole, selectedDesignation, photoURL)
      .then(success => {
        if (success) {
          handleSuccess();
          navigation.navigate('NavigationScreen');
        } else {
          // Registration failed, handle the error or display an error message
          // handleBackendError(new Error('Registration failed'));
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
        // An error occurred during registration, handle the error or display an error message
        // handleBackendError(error);
      });
  };

  const handleRoleSelection = role => {
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
        
        
        </View>
      <TouchableOpacity
        style={[styles.submitBtn1, isLoading && styles.buttonDisabled]}
        onPress={() =>
          handlePressRegister(
            name,
            email,
            pass,
            phone,
            selectedRole,
            selectedDesignation,
            photoURL
          )
        }
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>Enter Details</Text>
        )}
      </TouchableOpacity>
     
    </ScrollView>
  );
};

export default GuInfo;
