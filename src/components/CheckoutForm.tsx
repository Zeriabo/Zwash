import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {
  CardField,
  ConfirmPaymentResult,
  useStripe,
} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createBooking} from '../redux/actions/BookingActions';
import {HeaderBackButton} from '@react-navigation/elements';
import store from '../redux/store';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
type Props = {
  route: any;
  navigation: any;
};

const CheckoutForm: React.FC<Props> = ({route, navigation}) => {
  const {confirmPayment} = useStripe();
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);

  const state = useSelector((state: any) => state);
  console.log(state.cars.cars[0]);
  const dispatch = useDispatch();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setSelectedDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handlePayment = async () => {
    if (selectedCar == null) {
      Alert.alert('Please select a car');
      return;
    }
    if (cardDetails == null) {
      Alert.alert('Please enter card details');
      return;
    }
    const currentDate = new Date();
    if (date < currentDate) {
      Alert.alert('Invalid Date', 'Please select a future date');
      return;
    }
    const updatedPaymentIntent: ConfirmPaymentResult = await confirmPayment(
      state.cart.pi,
      {
        type: 'Card',
        paymentMethodType: 'Card',
        cardDetails,
      },
    );

    if (
      updatedPaymentIntent.paymentIntent &&
      updatedPaymentIntent.paymentIntent.status
    ) {
      // Show success message
      Alert.alert('Success', 'Payment successful.');
      // Extract the necessary data from the Redux state
      const state = store.getState();
      const user = state.user.user;
      const stationId = state.station.selectedStation;
      // Create the booking payload using the extracted data
      const bookingPayload = {
        carId: selectedCar,
        userId: user.id,
        stationId: stationId,
        washingProgramId: route.params.id,
        token: state.user.user?.token,
        executed: false,
      };
      // Make an API call to create a booking
      console.log('bookingPayload');
      console.log(bookingPayload);
      dispatch(createBooking(bookingPayload));
    } else {
      // Show error message
      Alert.alert('Error', 'Payment failed.');
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* ... existing code ... */}
      <View style={styles.boxedContainer}>
        <Button title="select a date" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {/* Car Selection Dropdown */}
        <Picker
          selectedValue={selectedCar}
          onValueChange={(itemValue, itemIndex) => setSelectedCar(itemValue)}>
          <Picker.Item label="Select a Car" value={null} />
          {state.cars.cars.map((car: any) => (
            <Picker.Item
              key={car.carId}
              label={car.manufacture}
              value={car.carId}
            />
          ))}
        </Picker>

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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  boxedContainer: {
    width: '100%', // Adjust the width as needed
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: 'purple',
    marginTop: 16,
  },
  checkoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 300,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});
export default CheckoutForm;
