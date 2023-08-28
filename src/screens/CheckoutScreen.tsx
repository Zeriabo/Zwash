import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {confirm_payment} from '../redux/actions/BuyActions';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Use flex to center content vertically
    backgroundColor: 'gray',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  boxedContainer: {
    width: '80%', // Adjust the width as needed
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: 'purple',
    marginTop: 16,
  },
  checkoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 300,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

const CheckoutScreen = (route: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pi = useSelector((state: any) => state.cart.pi);
  const navigation = useNavigation();

  const item = route.params;
  useEffect(() => {
    setLoading(false);
  }, []);

  const confirmPayment = async () => {
    const payment = {
      paymentIntentId: pi.paymentIntentId,
      paymentMethodId: pi.paymentMethodId,
    };
    console.log('confirmation');
    dispatch(confirm_payment(payment))
      .then(() => {
        // Payment confirmation succeeded, navigate to home
        navigation.navigate('Stations');
      })
      .catch((error: Error) => {
        // Payment confirmation failed, display error message
        Alert.alert('Payment Confirmation Failed', error.message);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderBackButton
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.boxedContainer}>
        {/* Display your checkout details here */}
        <TouchableOpacity
          onPress={confirmPayment}
          style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;
