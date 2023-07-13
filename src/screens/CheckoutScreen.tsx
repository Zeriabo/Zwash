import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {confirm_payment} from '../redux/actions/BuyActions';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxedContainer: {
    width: '100%',
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
});

const CheckoutScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pi = useSelector(state => state.cart.pi);
  const navigation = useNavigation();

  const item = route.params;

  useEffect(() => {
    setLoading(false);
  }, []);

  const confirmPayment = async () => {
    const payment = {
      '@class': 'com.zwash.pojos.ConfirmPaymentRequest',
      paymentIntentId: pi.paymentIntentId,
      paymentMethodId: 1,
    };

    dispatch(confirm_payment(payment))
      .then(() => {
        // Payment confirmation succeeded, navigate to home
        navigation.navigate('Home');
      })
      .catch(error => {
        // Payment confirmation failed, display error message
        Alert.alert('Payment Confirmation Failed', error.message);
      });
  };

  return (
    <View style={styles.mainContainer}>
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
