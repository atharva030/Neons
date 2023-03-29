import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from '../Styles/AddTaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {useState} from 'react';
import {IconButton} from 'react-native-paper';

import LoginScreen from './Login';

const RegisterScreen = ({navigation}) => {
  const [hidePassword, sethidePassword] = useState(true);
  const [hidecnfPassword, sethidecnfPassword] = useState(true);
  const [password, setPassword] = useState('');
  return (
    <ScrollView style={styles.Addfullscreen}>
      <View style={styles.Loginsubscreen}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginTop: 20}}
          onPress={() => navigation.navigate('Welcome')}>
          <Icon name="chevron-back" size={30} color="white" />
          <Text style={styles.AddtitleText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerSecondScreen}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            fontSize: 25,
            marginTop: 10,
            marginBottom: 15,
          }}>
          Create a new Account
        </Text>
        <View style={{marginTop: 10}}>
          <Text style={styles.emaillabelStyle}>Full Name</Text>
          <TextInput
            style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            // Making the Under line Transparent.
            placeholderTextColor="#8d98b0"
            //   underlineColorAndroid="transparent"
          />
        </View>
        <View>
          <Text style={styles.emaillabelStyle}>Phone</Text>
          <TextInput
            style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            // Making the Under line Transparent.
            placeholderTextColor="#8d98b0"
            //   underlineColorAndroid="transparent"
          />
        </View>
        <View>
          <Text style={styles.emaillabelStyle}>Email</Text>
          <TextInput
            style={styles.Emailinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            // Making the Under line Transparent.
            placeholderTextColor="#8d98b0"
            //   underlineColorAndroid="transparent"
          />
        </View>
        <Text style={styles.labelStyle}>Password</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.passwordinput} // Adding hint in TextInput using Placeholder option.
            placeholder=""
            // Making the Under line Transparent.
            placeholderTextColor="#8d98b0"
            //   underlineColorAndroid="transparent"
            secureTextEntry={hidePassword}
          />
          <IconButton
            icon={hidePassword ? 'eye-off' : 'eye'}
            iconColor="black"
            size={20}
            color="black"
            onPress={() => {
              sethidePassword(!hidePassword);
            }}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.labelStyle}>Confirm Password</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.passwordinput} // Adding hint in TextInput using Placeholder option.
              placeholder=""
              // Making the Under line Transparent.
              placeholderTextColor="#8d98b0"
              //   underlineColorAndroid="transparent"
              secureTextEntry={hidecnfPassword}
            />
            <IconButton
              icon={hidecnfPassword ? 'eye-off' : 'eye'}
              iconColor="black"
              size={20}
              color="black"
              onPress={() => {
                sethidecnfPassword(!hidecnfPassword);
              }}
            />
          </View>
        </View>
        <Button
          onPress={() => navigation.navigate('Login')}
          style={styles.submitBtn}
          mode="contained">
          Register
        </Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontFamily: 'Poppins-Regular',
              fontSize: 13,
              marginTop: 10,
            }}>
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: '#5a55ca',
                textDecorationLine: 'underline',
                marginTop: 10,
                fontFamily: 'Poppins-Medium',
                marginLeft: 5,
              }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            marginTop: 10,
          }}>
          Sign In/ Register with:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => console.warn('google Pressed')}>
            <Icon
              name="ios-logo-google"
              size={35}
              color="#5a55ca"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.warn('facebook Pressed')}>
            <Icon name="ios-logo-facebook" size={35} color="#5a55ca" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
