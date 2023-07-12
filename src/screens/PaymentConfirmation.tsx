import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PaymentConfirmation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Confirmation</Text>
      <Text>Your payment has been successfully confirmed!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default PaymentConfirmation;
