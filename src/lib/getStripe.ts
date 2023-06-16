import {loadStripe} from '@stripe/stripe-js';
import Config from 'react-native-config';

let stripePromise: any;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(Config.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
