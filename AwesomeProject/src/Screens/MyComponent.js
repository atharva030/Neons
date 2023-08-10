import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MyComponent = () => {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#0cbaba', '#380036']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          flex: 1,
        }}></LinearGradient>
    </View>
  );
};

export default MyComponent;
