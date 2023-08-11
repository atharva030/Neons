import React, {useEffect} from 'react';
import {StyleSheet, View, Animated, Dimensions} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';

const RotatedGradient = () => {
  const rotateValue = new Animated.Value(0);
  const scaleValue = new Animated.Value(1);
  const gradientOpacity = new Animated.Value(0);

  useEffect(() => {
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    );

    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    );

    rotationAnimation.start();
    scaleAnimation.start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientOpacity, {
          toValue: 0.6,
          duration: 10000,
          useNativeDriver: false,
        }),
        Animated.timing(gradientOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    return () => {
      rotationAnimation.stop();
      scaleAnimation.stop();
    };
  }, []);

  const interpolatedRotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const {width, height} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              {translateY: -width * 0.1}, // Move up by half the circle's diameter
              {rotate: interpolatedRotate},
              {scale: scaleValue},
            ],
          },
        ]}>
        <Animated.View
          style={[
            styles.gradient,
            {
              opacity: gradientOpacity,
            },
          ]}>
          <LinearGradient
            colors={['#1e010b', '#001314']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    width: Dimensions.get('window').width * 10,
    height: Dimensions.get('window').width * 90,
    borderRadius: (Dimensions.get('window').width * 0.9) / 2,
    overflow: 'hidden',
    transform: {translateY: Dimensions.get('window').width * 9},
  },
  gradient: {
    flex: 1,
  },
});

export default RotatedGradient;
