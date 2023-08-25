import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CarWashingProgram, Station} from '../redux/types/stationsActionTypes';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';
interface Props {
  route: RouteProp<{params: {station: Station}}, 'params'>;
  navigation: NavigationProp<any>;
}

const WashesScreen: React.FC<Props> = ({route, navigation}) => {
  console.log(route);

  return (
    <View style={styles.container}>
      <HeaderBackButton
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>MyWashes</Text>
      <Text style={styles.programsTitle}>Washes:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  programsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  programContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#eaeaea',
    marginBottom: 10,
  },
  programText: {
    fontSize: 14,
  },
  backButton: {
    marginRight: 300,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default WashesScreen;
