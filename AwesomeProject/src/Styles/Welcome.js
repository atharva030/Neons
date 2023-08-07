import FontSize from '../../constant/FontSize';
import Spacing from '../../constant/Spacing';
import Colors from '../../constant/Colors';

module.exports = {
  fullscreen: {
    backgroundColor: '#1b1b1b',
    height: '100%',
  },
  titleView: {
    paddingHorizontal: Spacing * 4,
    paddingTop: Spacing * 10,
  },
  title1: {
    fontSize: FontSize.xxLarge,
    color: '#b4cef8',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  title2: {
    fontSize: 32,
    color: '#fefffe',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginTop: 20,
  },
  title3: {
    fontSize: 15,
    color: 'grey',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 25,
    letterSpacing: 1,
  },
  buttonView: {
    paddingHorizontal: Spacing * 2,
    paddingTop: Spacing * 6,
    flexDirection: 'row',
    backgroundColor: 'onPrimary',
  },

  mainContainer: {
    marginTop: 80,
    flexDirection: 'column',
    height: '30%',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },

  card: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    margin: 10,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b4cef8',
  },

  headingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: FontSize.small,
    marginLeft: 20,
    marginTop: 6,
    color: 'black',
  },

  rightIcon: {
    backgroundColor: Colors.background,
    flex: 1,
    marginLeft: 60,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  google_logo: {
    marginLeft: 29,
  },
  facebook_logo: {
    marginLeft: 14,
  },
  email_logo: {
    marginLeft: 45,
  },
};
