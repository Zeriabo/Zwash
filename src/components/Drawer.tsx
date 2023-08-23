import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Main from '../screens/Main';
import StationPage from '../screens/StationPage';
import BuywashScreen from '../screens/BuywashScreen';
import RegisterCarScreen from '../screens/RegisterCarScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentConfirmation from '../screens/PaymentConfirmation';
import CheckoutForm from './CheckoutForm';
import SignOutScreen from '../screens/SignOutScreen';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  const user = useSelector((state: any) => state.user);
  console.log(user);
  if (user.user == null) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Signin" component={SignInScreen} />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />

        <Drawer.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
        />
        <Drawer.Screen name="CheckoutForm" component={CheckoutForm} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="SignOut" component={SignOutScreen} />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />

        <Drawer.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
        />
        <Drawer.Screen name="CheckoutForm" component={CheckoutForm} />
      </Drawer.Navigator>
    );
  }
}
