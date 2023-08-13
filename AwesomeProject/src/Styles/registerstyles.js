import {StyleSheet} from 'react-native';

const RegisterStyle = StyleSheet.create({
  Addfullscreen: {
    flex: 1,
    margin: 20,
  },
  accountBack: {
    backgroundColor: '#20212a',
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#351c4f',
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
    paddingHorizontal: 20,
  },
  titleText1:{
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 25,
  },
  titleText2: {
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    marginBottom: 15,
    color: '#70686a',
    fontSize: 16,
    textAlign: 'center',
  },
  roleSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
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
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'white',
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
    color: 'white',
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
    color: 'white',
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
    color: '#f3c134',
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
    backgroundColor: '#1f1f1f',
    borderColor: '#835d3c',
    borderWidth: 2,
  },
  selectedRoleImage: {
    opacity: 10,
  },
  selectedRoleText: {
    color: 'white',
  },
  buttonDisabled:{
    backgroundColor: '#20212a',
    color: '#808080'
  },
  buttonTextDisabled:{
    color: '#808080'
  }
});
export default RegisterStyle;
