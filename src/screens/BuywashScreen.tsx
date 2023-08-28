import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {create_paymentIntent} from '../redux/actions/BuyActions';
import {HeaderBackButton} from '@react-navigation/elements';

type Props = {
  route: any;
  navigation: any;
};

const BuywashScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch<any>();
  const state = useSelector((state: any) => state);
  const selectedProgram = route.params.selectedProgram;
  const [program, setProgram] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  console.log('state');
  console.log(state);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ),
      headerTitle: '', // Remove the header title
      headerTitleAlign: 'left', // Align the header title to the left
    });
  }, [navigation]);
  useEffect(() => {
    setProgram({
      ...selectedProgram,
    });
  }, [selectedProgram]);

  useEffect(() => {
    if (state.cart.pi && state.cart.pi.paymentIntentId) {
      setPaymentMethod(state.cart.pi.paymentMethod);
    } else {
      setPaymentMethod('');
    }
  }, [state.cart.pi]);

  const handlePaymentMethodSelection = (method: string) => {
    setPaymentMethod(method);
    dispatch(create_paymentIntent({...program}, method));
    navigation.navigate('CheckoutForm', program);
  };

  return (
    <View style={styles.container}>
      <HeaderBackButton
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.programTitle}>{selectedProgram.program}</Text>
        <Text style={styles.programDescription}>
          {selectedProgram.description}
        </Text>
        <Text style={styles.programPrice}>Price: {selectedProgram.price}</Text>
        {state.user.user != null ? (
          <Button
            title="Credit Card"
            disabled={paymentMethod === 'creditCard'}
            onPress={() => handlePaymentMethodSelection('credit_card')}
          />
        ) : null}
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
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    alignItems: 'center', // Center content horizontally within this container
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
  backButton: {
    marginRight: 300,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default BuywashScreen;
