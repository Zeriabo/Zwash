import React, {useState} from 'react';
import {Alert, Button, View} from 'react-native';
import {
  CardField,
  ConfirmPaymentResult,
  useStripe,
} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';

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

  return (
    <View>
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
  );
};

export default CheckoutForm;
