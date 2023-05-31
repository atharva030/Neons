const { red100, black } = require("react-native-paper/lib/typescript/src/styles/themes/v2/colors");
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//This is for Team Scr1 and TaskList
module.exports = {
  fullscreen: {
    backgroundColor: '#f0f4fd',
    minHeight: Dimensions.get('window').height,
  },

  flexBox: {
    margin: 15,
    flexDirection: 'columns',
  },
  outer: {
    margin: 25,
    // flexGrow: 1
  },

  titleContainer: {
    height: 50,
    width: '70%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logo: {
    height: 35,
    width: 35,
    borderRadius: 1000,
  },

  titleText: {
    flexDirection: "row",
    alignSelf: "flex-start",
    fontSize: 23,
    borderRadius: 30,
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
  },
  teamtitleText: {
    width: '50%',
    height: 50,
    maxWidth: 300,
    fontSize: 23,
    borderRadius: 30,
    fontFamily: 'Poppins-ExtraBold',
    color: 'black',
  },
  dayContainer: {
    height: 50,
    // justifyContent:'space-evenly',
    flexDirection: 'row',
  },
  innerdayContainer: {
    height: 50,
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontFamily: 'Poppins-Medium',
    color: '#8d98b0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#f26950',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 100,
    height: 40,
  },
  addText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  calenderStyle: {
    height: 100,
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  //TaskItem Styling Starts

  taskFlex: {
    width: screenWidth - 60,
    height: 170,
    flexDirection: 'column',
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 1,
    width: screenWidth - 100,
    marginLeft: 10,
  },
  firstflex: {
    color: 'red',
    padding: 10,
  },
  taskText: {
    color: '#8d98b0',
     flexDirection:"row",
    alignSelf:"flex-start",
  },
  taskBigText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-ExtraBold',
  },
  secondSubFlex: {
    flexDirection:"row",
    alignSelf:"flex-start",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainSecondFlex: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    paddingBottom: 0,
  },
  timeSlot: {
    color: 'black',
  },
  secondflex: {
    flexDirection: 'column',
  },
  flexIcon: {
    marginTop: 25,
    display: "flex",
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 80,
  },


  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5

  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',

  },

  textInputStyle: {
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'grey'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },


  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5

  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',

  },

  textInputStyle: {
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'grey'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  taskContent: {
    flex: 1,
  },
  additionalContent: {
    marginLeft: 20,
    marginTop: 8

  },
  showbtn: {
    display: "flex",
    flexDirection: 'row',
    backgroundColor: 'red'

  },
  subtaskTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'black'

  },

  individualSubT: {
    backgroundColor: '#f0f4fd',
    marginBottom: 5,
    borderRadius: 10,
    padding: 5
  },
  subTTitle: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
    fontSize: 12,
    color: 'black',
    width: 150,
    textAlign: 'justify'

  },
  uploadButton: {
    backgroundColor: '#097969',
    borderRadius: 5,
    margin: 10,
    width: 100,
    height: 40,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadbtnTxt: {

    fontSize: 16
  },

  downArrowText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  }
};
