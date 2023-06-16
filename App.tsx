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
import PaymentForm from './src/screens/PaymentForm';
import {StripeProvider} from '@stripe/stripe-react-native';

const RootStack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <StripeProvider publishableKey="pk_live_51NInIUC7hkCZnQICP9yJ7wYGv7fD2LqywpY7VGeYOrYN6xeoe09la1YIP8vILsNCY3yDADOuCatlAWKUHe6CYKoF00BkFTP4bd">
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
            <RootStack.Screen name="PaymentForm" component={PaymentForm} />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
}

export default App;
