import React, {useState} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {
  CardField,
  ConfirmPaymentResult,
  useStripe,
} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createBooking} from '../redux/actions/BookingActions';
import {HeaderBackButton} from '@react-navigation/elements';

type Props = {
  route: any;
  navigation: any;
};

const CheckoutForm: React.FC<Props> = ({route, navigation}) => {
  const {confirmPayment} = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const handlePayment = async () => {
    //need a set of cars to the user and select which car he wants to buy the wash
    console.log(state);
    const updatedPaymentIntent: ConfirmPaymentResult = await confirmPayment(
      state.cart.pi,
      {
        type: 'Card',
        paymentMethodType: 'Card',
        ...cardDetails,
      },
    );

    if (
      updatedPaymentIntent.paymentIntent &&
      updatedPaymentIntent.paymentIntent.status
    ) {
      // Show success message
      Alert.alert('Success', 'Payment successful.');

      // Make an API call to create a booking
      const response = await dispatch(createBooking());

      // Check the response and navigate if needed
      if (response.status === 201) {
        // Booking created successfully
        // Navigate to the "washes" page
        navigation.navigate('Washes');
      } else {
        // Handle booking creation error if needed
      }
    } else {
      // Show error message
      Alert.alert('Error', 'Payment failed.');
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <HeaderBackButton
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.boxedContainer}>
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails: any) => {
            setCardDetails(cardDetails);
          }}
          // onFocus={focusedField => {
          //   console.log('focusField', focusedField);
          // }}
        />
        <Button title="Pay" onPress={handlePayment} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  boxedContainer: {
    width: '100%', // Adjust the width as needed
    paddingHorizontal: 0,
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
export default CheckoutForm;
