import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {useState} from 'react';
import {FAB, Portal, Provider, TextInput} from 'react-native-paper';
import styles from '../Styles/Teams1';

import Icon from 'react-native-vector-icons/Ionicons';
import TeamNames from '../Components/Teams/TeamNames';

const Team_scr1 = ({navigation}) => {
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  const {open} = state;
  return (
    <ScrollView>
      <View style={styles.Addfullscreen}>
        <View style={styles.Addsubscreen}>
          <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 20}}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="white" />
            <Text style={styles.AddtitleText}>Teams</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addSecondScreen}>
          {/* Floting add icon   */}

          <Provider>


          <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}>
                <Icon
                  name="checkmark-circle-outline"
                  size={90}
                  color="#008000"
                />
                <Text style={styles.modalTital}>Congrats !</Text>
                <Text style={styles.modalSubtital}>
                  You successfully created a task in your account.
                </Text>
              </Modal>
            </Portal>



            <Portal>
              <FAB.Group
                open={open}
                visible
                icon={open ? 'chevron-down' : 'plus'}
                actions={[
                  {
                    icon: 'account-plus',
                    label: 'New Team',
                    onPress: () => console.log('Pressed star'),
                  },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                  if (open) {
                    // do something if the speed dial is open
                  }
                }}
              />
            </Portal>
          </Provider>
        </View>
      </View>
    </ScrollView>
  );
};

export default Team_scr1;
