import {StyleSheet} from 'react-native';

const RegisterStyle = StyleSheet.create({
  Addfullscreen: {
    flex: 1
  },
  Loginsubscreen: {
    backgroundColor: '#b3caf3',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 20,
    paddingTop: 10,
  },
  loginText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  submitBtn1: {
    width: '90%',
    marginTop: 20,
    backgroundColor: '#b3caf3',
    color: 'white',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  AddtitleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
    color: 'white',
    marginLeft: 10,
  },
  registerSecondScreen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titleText: {
    color: '#b3caf3',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  roleSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 50,
  },
  roleSelectionIconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderRadius: 5,
    shadowColor: 'gray',
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  roleSelectionText: {
    marginTop: 5,
    fontFamily: 'Poppins-Medium',
    color: '#8d98b0',
  },
  inputContainer: {
    marginTop: 10,
    width: 280,
  },
  labelStyle: {
    color: '#fefffe',
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  inputStyle: {
    height: 40,
    borderWidth: 1,
    borderColor: '#fefffe',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#b1c9f1',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fefffe',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInputStyle: {
    flex: 1,
    height: 40,
    color: '#b1c9f1',
  },

  submitBtn: {
    marginTop: 20,
    width: 280,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signInText: {
    color: '#ffefff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginTop: 10,
  },
  signInLink: {
    color: '#b1c9f1',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  roleImageadmin: {
    width: 60,
    height: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleImagemember: {
    width: 80,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'red',
  },
  selectedRoleContainer: {
    backgroundColor: '#1b1b1b',
    borderColor: '#b1c9f1',
    borderWidth: 2,
  },
  selectedRoleImage: {
    opacity: 10,
  },
  selectedRoleText: {
    color: '#b1c9f1',
  },
});

export default RegisterStyle;
