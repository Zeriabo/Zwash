import {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {initPaymentSheet, useStripe} from '@stripe/stripe-react-native';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'gray',
  },
  boxedContainer: {
    width: '80%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#9c333c',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  image: {width: 80, height: 40},
  row: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkoutButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#db0d48',
  },
  headingText: {fontSize: 24, color: 'white'},
  cartItemText: {fontSize: 16, color: 'black'},
  divider: {marginLeft: 16},
  checkoutAreaContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {fontSize: 16, color: 'white'},
  cartContainer: {marginVertical: 8},
});

const CheckoutScreen = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Merchant',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });

    if (!error) {
      setLoading(true);
    }
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

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.boxedContainer}>
        <View style={styles.cartContainer}>
          <Text style={styles.headingText}>Your Cart</Text>
        </View>
        {items.map((item: any) => (
          <View key={item.id} style={styles.cardContainer}>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={styles.image}
            />
            <View style={styles.row}>
              <Text style={styles.cartItemText}>{item.name}</Text>
              <View style={styles.divider} />
              <Text style={styles.cartItemText}>${item.price}</Text>
            </View>
          </View>
        ))}
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
