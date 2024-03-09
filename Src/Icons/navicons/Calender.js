import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-styled-datepicker';
import moment from 'moment';

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDayName = (date) => {
    return moment(date).format('dddd');
  };

  const checkHolidays = (date) => {
    // Implement your logic to check for holidays based on the date
    // Example: Check if the date is a weekend (Saturday or Sunday)
    const dayOfWeek = moment(date).day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <DatePicker
        mode="date"
        date={selectedDate}
        onDateChange={handleDateChange}
        style={styles.datePicker}
      />
      <Text style={styles.selectedDate}>
        Selected Date: {getDayName(selectedDate)} {checkHolidays(selectedDate) ? '- Holiday' : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    width: 200,
  },
  selectedDate: {
    marginTop: 20,
  },
});

export default Calender;
