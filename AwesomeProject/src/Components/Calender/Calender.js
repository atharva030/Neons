import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {transparent} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const Calendarstrip = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelected = date => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
        style={styles.calendar}
        dateNumberStyle={styles.dateNumber}
        dateNameStyle={styles.dateName}
        highlightDateNumberStyle={styles.highlightDateNumber}
        highlightDateNameStyle={styles.highlightDateName}
        highlightDateContainerStyle={styles.highlightDateContainer}
        disabledDateNameStyle={styles.disabledDateName}
        disabledDateNumberStyle={styles.disabledDateNumber}
        disabledDateOpacity={0.3}
        minDate={new Date()} // Set the minimum selectable date
        maxDate={new Date(2024, 12, 31)} // Set the maximum selectable date
        daySelectionAnimation={{type: 'background', duration: 200}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  calendar: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#1b1b1b',
  },
  calendarHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNumber: {
    color: '#ffff',
    fontSize: 12,
  },
  dateName: {
    color: '#313131',
    fontSize: 12,
    marginTop: -5,
    paddingBottom: 10,
  },
  highlightDateContainer: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    height: 60,
    width: 35,
  },
  highlightDateNumber: {
    color: '#1b1b1b',
    fontSize: 12,
  },
  highlightDateName: {
    color: '#1b1b1b',
    fontSize: 12,
    marginTop: -5,
  },
  disabledDateNumber: {
    color: '#ffff',
    fontSize: 12,
  },
  disabledDateName: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: -5,
  },
});

export default Calendarstrip;
