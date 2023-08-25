import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import StationPage from './src/screens/StationPage';
import BuywashScreen from './src/screens/BuywashScreen';
import store from './src/redux/store';
import MessageDisplay from './src/components/MessageDisplay';
import CheckoutScreen from './src/screens/CheckoutScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentConfirmation from './src/screens/PaymentConfirmation';
import CheckoutForm from './src/components/CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import RegisterCarScreen from './src/screens/RegisterCarScreen';
import HomeScreen from './src/screens/HomeScreen'; // Import the HomeScreen component
import CarsScreen from './src/screens/CarsScreen'; // Create other screens as needed
import Main from './src/screens/Main';
import 'react-native-gesture-handler';
import {MyDrawer} from './src/components/Drawer';

const RootStack = createNativeStackNavigator();
const stripePromise = loadStripe(
  'pk_test_51NInIUC7hkCZnQICpeKcU6piJANDfXyV3wcXXFPP39hu4KlZRMj4AvuHPiSv5Kv30KGK79zFRMRfGR2rtw0XQJEV00IYaSztHB',
);

export const client = new ApolloClient({
  uri: 'http://localhost:7001/graphql',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  cache: new InMemoryCache(),
});
function App(): JSX.Element {
  return (
    <StripeProvider publishableKey="pk_test_51NInIUC7hkCZnQICpeKcU6piJANDfXyV3wcXXFPP39hu4KlZRMj4AvuHPiSv5Kv30KGK79zFRMRfGR2rtw0XQJEV00IYaSztHB">
      <Elements stripe={stripePromise}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <MessageDisplay />
            <NavigationContainer>
              <RootStack.Navigator screenOptions={{headerShown: false}}>
                <RootStack.Screen name="Drawer" component={MyDrawer} />
                <RootStack.Screen name="StationPage" component={StationPage} />
                <RootStack.Screen name="Buywash" component={BuywashScreen} />
                {/* <RootStack.Screen name="Main" component={Main} /> */}
                <RootStack.Screen
                  name="RegisterCar"
                  component={RegisterCarScreen}
                />
                <RootStack.Screen
                  name="CheckoutScreen"
                  component={CheckoutScreen}
                />
                <RootStack.Screen
                  name="PaymentScreen"
                  component={PaymentScreen}
                />

                <RootStack.Screen
                  name="PaymentConfirmation"
                  component={PaymentConfirmation}
                />
                <RootStack.Screen
                  name="CheckoutForm"
                  component={CheckoutForm}
                />
              </RootStack.Navigator>
            </NavigationContainer>
          </ApolloProvider>
        </Provider>
      </Elements>
    </StripeProvider>
  );
}

export default App;
