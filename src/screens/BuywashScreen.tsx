import React from 'react';
import {View, Text, StyleSheet, Button, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

function BuywashScreen({route}: any) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const selectedProgram = route.params.selectedProgram;

  return (
    <View>
      <Text>Hello {user.user.firstName}</Text>
      <Text>{selectedProgram.program}</Text>
    </View>
  );
}

export default BuywashScreen;
