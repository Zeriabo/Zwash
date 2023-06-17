import {useState, useEffect} from 'react';
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'gray',
  },
  boxedContainer: {
    width: '80%',
    paddingHorizontal: 100,
    paddingVertical: 10,
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
  itemText: {fontSize: 16, color: 'black'},
  divider: {marginLeft: 16},
  checkoutAreaContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutText: {fontSize: 16, color: 'white'},
  cartContainer: {marginVertical: 8},
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
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
          <View style={styles.row}>
            <Text style={styles.itemText}>{item.program}</Text>
            <View style={styles.divider} />
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
