import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
module.exports = {
  fullscreen: {
    height: windowHeight,
    widht: windowWidth,
    flex: 1,
  },
  flexBox: {
    margin: 15,
    flexDirection: 'columns',
  },

  outer: {
    margin: 20,
  },
  titleContainer: {
    height: 50,
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logo: {
    height: 35,
    width: 35,
    borderRadius: 1000,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  titleText: {
    width: '40%',
    height: 50,
    maxWidth: 300,
    fontSize: 23,
    borderRadius: 30,
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
  },
  teamtitleText: {
    width: '50%',
    height: 50,
    maxWidth: 300,
    fontSize: 27,
    borderRadius: 30,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  dayContainer: {
    height: 50,
    flexDirection: 'row',
  },
  innerdayContainer: {
    height: 50,
    width: '65%',
    flexDirection: 'column',
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

  teamFlex: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.186,
    flexDirection: 'column',
    border: 1,
    borderWidth: 1,
    borderColor: '#1b1b1b',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '5.58%',
    elivation: 1,
    offset: 999,
    shadow: 10,
    shadowColor: 'gray',
  },
  taskFlex: {
    width: 300,
    height: 170,
    flexDirection: 'column',
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 1,
    width: 250,
    marginLeft: 10,
  },
  firstflex: {
    color: 'red',
    padding: 10,
  },
  taskText: {
    color: 'white',
  },
  personText: {
    color: '#afaeaf',
    marginLeft: 10,
  },
  teamBigText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  secondSubFlex: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  forwardArrow:{
    backgroundColor: '#141011',
    borderRadius: 10,
    borderColor: "##1a1a1b",
    padding: 5,
  }
};
