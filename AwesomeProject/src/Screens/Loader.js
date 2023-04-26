import * as React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { MD2Colors } from 'react-native-paper';
import { Dimensions } from 'react-native';

const Loader = ({ loading }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <Modal transparent={true} visible={loading}>
      <View style={styles.modalContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.blue} size='large' />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Loader;
