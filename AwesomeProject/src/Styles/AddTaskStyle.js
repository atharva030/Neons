const {Dimensions} = require('react-native');
const {LinearGradient} = require('react-native-svg');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
module.exports = {
  Addfullscreen: {
    margin: 20,
    height: deviceHeight,
    widht: deviceWidth,
    flex: 1,
  },
  btmeditsheet: {
    width: '100%',
    height: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addteamcontainerStyle: {
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.38 ,
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems:'flex-start',
    position: 'absolute',
    top: (deviceHeight - deviceHeight * 0.45) / 2,
    left: (deviceWidth - deviceWidth * 0.85) / 2,
  },
  flexBox: {
    flexDirection: 'columns',
  },
  Addsubscreen: {
    // flex: 1,
    height: deviceHeight / 8,
    marginBottom: 20,
  },

  modalSecondScreen: {
    // backgroundColor: 'white',
    // padding: 30,
    // marginLeft: 21,
    // marginRight: 21,
    // marginTop:25,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  addSecondScreen: {
    backgroundColor: 'black',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    flexDirection: 'column',
  },
  accountBack: {
    backgroundColor: '#20212a',
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  AddtitleText: {
    height: 50,
    maxWidth: 300,
    fontSize: 22,
    borderRadius: 30,
    fontFamily: 'Poppins-Bold',
    color: '#1b1b1b',
  },
  dateInput: {
    borderColor: 'white',
    width: '96%',
    borderBottomWidth: 1,
    color: 'black',
    paddingVertical: 0,
  },
  input: {
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    paddingVertical: 0,
    fontFamily: 'Poppins-Regular',
  },
  Emailinput: {
    width: '100%',
    borderColor: 'grey',
    marginLeft:10,
    color: 'white',
    borderBottomWidth: 1,
    paddingVertical: 0,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'flex-start',
  },
  passwordinput: {
    borderColor: 'white',
    width: '94%',
    borderBottomWidth: 1,
    color: 'white',
    paddingVertical: 0,
    height: 32,
    fontFamily: 'Poppins-Regular',
  },
  labelStyle: {
    color: 'black',
    marginLeft: 4,
    color: 'white',
    fontFamily: 'Poppins-Medium',
    marginTop: 15,
    alignSelf: 'flex-start',
  },

  commonPadding: {},
  avatarText: {
    color: '#c2c9d7',
    fontFamily: 'Poppins-Regular',
  },
  timeContainer: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginLeft: 43,
    marginTop: 10,
  },
  timeInput: {
    borderColor: '#8d98b0',
    borderBottomWidth: 1,
    color: 'white',
    width: '100%',
    paddingVertical: 0,
  },
 
  submitBtn1: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#351c4f',
    color: 'white',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  loginText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  sendOtp: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#351c4f',
    marginBottom: 315,
  },

  AddTeamsubscreen: {
    flex: 1,
    marginBottom: 20,
  },
  Loginsubscreen: {
    marginBottom: 20,
  },
  loginSecondScreen: {
    // height: '100%',
    flex: 1,
    width: '100%',
    backgroundColor: '#1b1b1b',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 67,
    flexDirection: 'column',
  },
  registerSecondScreen: {
    height: deviceHeight / 1.15,
    width: '100%',
  },
  AddTeamSecondScreen: {
    // height: '90%',
    flex: 2,
    // width: '100%',
    backgroundColor: '#6DED65',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    flexDirection: 'column',
  },
  emaillabelStyle: {
    // marginLeft: 8,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  disabledSendOtp: {
    backgroundColor:"#808080",
  },
  
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: '100%',
    width: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  modalTital: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 20,
  },
  modalSubtital: {
    paddingTop: 20,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    color: 'grey',
  },

  orText: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  grayLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },
  orText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    height: '40%',
    width: '100%',
    zindex: 70,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },

  confirmButton: {
    width: 100,
    alignSelf: 'center',
  },
  cancelButton: {
    width: 100,
    alignSelf: 'center',
  },
  confomationtex: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },

  buttonDisabled:{
    backgroundColor: '#20212a',
    color: '#808080'
  },
  buttonTextDisabled:{
    color: '#808080'
  }
};
