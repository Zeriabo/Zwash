import React, {useState} from 'react';
import {Alert, Button, View} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {useSelector} from 'react-redux';

const CheckoutForm = () => {
  const {confirmPayment} = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const state = useSelector((state: any) => state);
  console.log(state.cart.pi);
  const handlePayment = async () => {
    console.log(cardDetails);
    const {error} = await confirmPayment(state.cart.pi, {
      type: 'Card',
      paymentMethodType: 'Card',
      ...cardDetails,
    });

    if (error) {
      Alert.alert('Error', 'Payment failed: ' + error);
      console.log(error);
    } else {
      Alert.alert('Success', 'Payment successful.');
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
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button title="Submit" onPress={handlePayment} />
    </View>
  );
};

export default CheckoutForm;
