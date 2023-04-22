import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const Landing = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4fd' }}>
      <View style={{ flex: 1, marginTop: 170, alignItems: 'center' }}>
        <Text
          style={{
            color: '#5a55ca',
            fontSize: 34,
            fontFamily: 'Poppins-SemiBold',
          }}>
          TaskStack
        </Text>
      </View>
      <View style={{ flex: 1, marginTop: 400, alignItems: 'center' }}>
        <Text style={{ color: 'grey', fontFamily: 'Poppins-Regular' }}>
          New Version 1.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default Landing;
