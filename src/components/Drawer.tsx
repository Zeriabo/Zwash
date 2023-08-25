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
import MyCars from '../screens/MyCars';
import WashesScreen from '../screens/WashesScreen';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  const user = useSelector((state: any) => state.user);
  const cars = useSelector((state: any) => state.cars.cars);
  if (user.user == null) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Signin" component={SignInScreen} />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />
      </Drawer.Navigator>
    );
  } else if (cars.length == 0) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="SignOut" component={SignOutScreen} />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />
        <Drawer.Screen name="RegisterCar" component={RegisterCarScreen} />
      </Drawer.Navigator>
    );
  } else {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="SignOut" component={SignOutScreen} />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />
        <Drawer.Screen name="RegisterCar" component={RegisterCarScreen} />
        <Drawer.Screen
          name="MyCars"
          component={MyCars}
          initialParams={{cars}}
        />
        <Drawer.Screen name="MyWashes" component={WashesScreen} />
      </Drawer.Navigator>
    );
  }
}
