import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import Stations from './src/screens/Stations';
import StationPage from './src/screens/StationPage';
import BuywashScreen from './src/screens/BuywashScreen';
import store from './src/redux/store';
import MessageDisplay from './src/components/MessageDisplay';
import CheckoutScreen from './src/screens/CheckoutScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentConfirmation from './src/screens/PaymentConfirmation';

const RootStack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <StripeProvider publishableKey="pk_test_51NInIUC7hkCZnQICpeKcU6piJANDfXyV3wcXXFPP39hu4KlZRMj4AvuHPiSv5Kv30KGK79zFRMRfGR2rtw0XQJEV00IYaSztHB">
      <Provider store={store}>
        <NavigationContainer>
          <MessageDisplay />
          <RootStack.Navigator initialRouteName="Home">
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="SignIn" component={SignInScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
            <RootStack.Screen name="Stations" component={Stations} />
            <RootStack.Screen name="StationPage" component={StationPage} />
            <RootStack.Screen name="Buywash" component={BuywashScreen} />
            <RootStack.Screen
              name="CheckoutScreen"
              component={CheckoutScreen}
            />
            <RootStack.Screen name="PaymentScreen" component={PaymentScreen} />
            <RootStack.Screen
              name="PaymentConfirmation"
              component={PaymentConfirmation}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
}

export default App;
