import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CarsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars</Text>
      {/* Your car-related content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CarsScreen;
