import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';

const PaymentForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {stripe} = useStripe();

  const handlePayment = async () => {
    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element

      confirmParams: {
        return_url: 'http://localhost:7001/api/payment/charge',
      },
    });
    // if (error) {
    //   setErrorMessage(error.message);
    // } else if (paymentIntent?.status === 'succeeded') {
    //   // Payment successful, process the paymentIntent.id on your backend
    //   console.log('Payment succeeded:', paymentIntent.id);
    // }
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <View>
      {/* Add input fields for card number, expiry date, CVC, etc. */}
      {/* For example: */}
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: 'Card Number',
          expiration: 'MM/YY',
          cvc: 'CVC',
        }}
      />

      {/* Display any error message */}
      {errorMessage !== '' && <Text>{errorMessage}</Text>}

      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

export default PaymentForm;
