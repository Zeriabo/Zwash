import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';

function PaymentScreen() {
  return (
    <StripeProvider
      publishableKey="pk_test_51NInIUC7hkCZnQICpeKcU6piJANDfXyV3wcXXFPP39hu4KlZRMj4AvuHPiSv5Kv30KGK79zFRMRfGR2rtw0XQJEV00IYaSztHB"
      urlScheme="your-url-scheme" // Replace with your own URL scheme
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // Replace with your own merchant identifier
    >
      {/* Your app code here */}
    </StripeProvider>
  );
}

export default PaymentScreen;
