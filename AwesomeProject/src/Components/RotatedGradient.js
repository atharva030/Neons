import React, {useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';

const RotatedGradient = () => {
  const translateY = new Animated.Value(0);

  return (
    <LinearGradient
      colors={['#1e010b', '#001314']}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      style={styles.gradient}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  gradient: {
    flex: 1,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
});

export default RotatedGradient;
