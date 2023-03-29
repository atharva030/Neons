import FontSize from '../../constant/FontSize';
import Colors from '../../constant/Colors';
import Spacing from '../../constant/Spacing';

module.exports = {
  fullscreen: {
    backgroundColor: '#f0f4fd',
    height: '100%',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  bottomView: {
    padding: Spacing * 1,
    marginTop: 4,
  },

  title1: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'poppins-bold',
    marginVertical: Spacing * 2,
  },
  title2: {
    fontFamily: 'poppins-semiBold',
    fontWeight: 'bold',
    fontSize: FontSize.medium,
    maxWidth: '75%',
    textAlign: 'center',
  },
  txtInput1: {
    fontFamily: 'poppins-regular',
    fontSize: FontSize.small,
    padding: Spacing * 1.1,
    backgroundColor: Colors.onPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  txtInput2: {
    fontFamily: 'poppins-regular',
    fontSize: FontSize.small,
    padding: Spacing * 1.1,
    backgroundColor: Colors.onPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  forgot: {
    fontFamily: 'poppins-semiBold',
    fontSize: FontSize.small,
    color: Colors.primary,
    alignSelf: 'flex-end',
  },
  button: {
    padding: Spacing * 1.2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
};
