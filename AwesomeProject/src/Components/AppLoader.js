import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
const {Dimensions} = require('react-native');

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Lottie
        source={require('../../assets/Image/loader.json')}
        autoPlay
        loop
        style={styles.loader}
      />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    // height:700,
    // top:-160

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  loader: {
    width: 100, // Adjust the width to reduce the size
    height: 100, // Adjust the height to reduce the size
  },
});
