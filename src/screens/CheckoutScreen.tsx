import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxedContainer: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: '#9c333c',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  checkoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#db0d48',
    marginTop: 16,
  },
  headingText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 16,
    borderRadius: 5,
  },
  checkoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },

  cartContainer: {marginVertical: 8},
  checkoutAreaContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});

const CheckoutScreen = (program: any) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(program.route.params.program);
  }, []);

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `http://localhost:7001/api/payment/paymentIntent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    useEffect(() => {
      initializePaymentSheet();
    }, []);

    const {paymentIntentId, ephemeralKey, customerId} = await response.json();

    return {
      paymentIntent: paymentIntentId,
      ephemeralKey,
      customer: customerId,
    };
  };

  const openPaymentSheet = async () => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.boxedContainer}>
        <View style={styles.cartContainer}>
          <Text style={styles.headingText}>Selected Program</Text>
        </View>

        <View key={item.id} style={styles.cardContainer}>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
          <View>
            <Text style={styles.itemText}>{item.program}</Text>
            <Text style={styles.itemText}>${item.description}</Text>
          </View>
        </View>

        <View style={styles.checkoutAreaContainer}>
          <TouchableOpacity
            disabled={!loading}
            onPress={openPaymentSheet}
            style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;
