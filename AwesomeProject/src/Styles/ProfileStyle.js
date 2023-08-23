import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

module.exports = {
  Addfullscreen: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 2,
    height: '100%',
  },

  leftIcon: {
    margin: 15,
    flexDirection: 'row',
  },
  accountBack: {
    backgroundColor: '#20212a',
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    justifyContent: 'center',
  },

  AddtitleText: {
    marginLeft: 20,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  profileDetails: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center', // Center the profile details horizontally
  },
  profileImage: {
    margin: 15,
  },

  ProfileTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.045,
    color: 'white',
  },
  ProfileSubtitle: {
    fontFamily: 'Poppins-Light',
    fontSize: width * 0.038,
    color: 'white',
  },
  editFlex: {
    flex: 1,
    margin: 15,
    marginTop: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
  },
  container: {
    marginLeft: 10,
    marginTop: 25,
  },
  editValBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  editTitle: {
    color: '#6e6e74',
    fontSize: width * 0.045,
  },
  editValue: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.042,
  },
  editBtn: {
    width: 100,
    borderRadius: 10,
    backgroundColor: '#414052',
  },
  signOutBtn: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
};
