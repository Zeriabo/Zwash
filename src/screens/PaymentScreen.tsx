import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {StripeProvider} from '@stripe/stripe-react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const handleToken = async (token: any) => {
  console.log(token);
  await axios
    .post('http://localhost:8080/v1/payment/charge', '', {
      headers: {
        token: token.id,
        amount: 500,
      },
    })
    .then(() => {
      Alert.alert('Payment Success');
    })
    .catch(error => {
      Alert.alert(error);
    });
};

function PaymentScreen(payment: any) {
  console.log(payment);
  return (
    <View style={styles.mainContainer}>
      <Text></Text>
    </View>
  );
}

export default PaymentScreen;
