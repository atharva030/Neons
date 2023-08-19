import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

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
        showMonth={true}
        calendarAnimation={{type: 'sequence', duration: 30}}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: 'white',
        }}
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
        // daySelectionAnimation={{type: 'background', duration: 2000 }}
        monthTextStyle={styles.monthText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  calendar: {
    height: 110,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  calendarHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#351c4f',
    paddingTop: 5,
    paddingBottom: 5,
  },
  dateNumber: {
    color: '#ffff',
    fontSize: 12,
  },
  dateName: {
    color: '#626567',
    fontSize: 12,
    marginTop: -5,
    paddingBottom: 10,
  },

  highlightDateContainer: {
    backgroundColor: '#351c4f',
    borderRadius: 10,
    height: 60,
    width: 35,
  },
  highlightDateNumber: {
    color: 'white',
    fontSize: 12,
  },
  highlightDateName: {
    color: 'white',
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
  showMonth: {
    color: '#ffff',
  },
  monthText: {
    fontSize: 16, // Customize font size
    fontWeight: 'bold', // Customize font weight
    color: '#fff', // Customize text col
  },
});

export default Calendarstrip;
