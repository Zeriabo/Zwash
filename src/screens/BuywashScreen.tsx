import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {create_paymentIntent} from '../redux/actions/BuyActions';

type Props = {
  route: any;
  navigation: any;
};

const BuywashScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch<any>();
  const buy = useSelector((state: any) => state);
  const selectedProgram = route.params.selectedProgram;
  const [program, setProgram] = useState({});
  const [cartItem, setCartItem] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  //i need an object with payment method and program to buy
  useEffect(() => {
    setProgram({
      ...selectedProgram,
      '@class': 'com.zwash.pojos.ConcreteCarWashingProgram',
    });
  }, [selectedProgram]);

  useEffect(() => {
    if (buy.cart.pi && buy.cart.pi.paymentIntentId) {
      setPaymentMethod(buy.cart.pi.paymentMethod);
    } else {
      setPaymentMethod('');
    }
  }, [buy.cart.pi]);

  const handlePaymentMethodSelection = (method: string) => {
    setPaymentMethod(method);
    console.log(method);
    console.log('program');
    console.log(program);
    dispatch(create_paymentIntent({...program}, method));
    navigation.navigate('CheckoutForm');
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.imageBackground}
      > */}
      <View style={styles.detailsContainer}>
        <Text style={styles.programTitle}>{selectedProgram.program}</Text>
        <Text style={styles.programDescription}>
          {selectedProgram.description}
        </Text>
        <Text style={styles.programPrice}>Price: {selectedProgram.price}</Text>
        <Button
          title="Credit Card"
          disabled={paymentMethod === 'creditCard'}
          onPress={() => handlePaymentMethodSelection('credit_card')}
        />
        <Button
          title="Apple Pay"
          disabled={paymentMethod === 'applePay'}
          onPress={() => handlePaymentMethodSelection('apple_pay')}
        />
        <Button
          title="Google Pay"
          disabled={paymentMethod === 'googlePay'}
          onPress={() => handlePaymentMethodSelection('google_pay')}
        />
        <Button
          title="Buy Now"
          // disabled={}
          onPress={() => {
            navigation.navigate('CheckoutScreen', {program: selectedProgram});
          }}
        />
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  programTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  programDescription: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  programPrice: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
});

export default BuywashScreen;
