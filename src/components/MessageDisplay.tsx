import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {RootState} from '../redux/store';
import {Message} from '../redux/types/messageActionTypes';

const MessageDisplay = () => {
  const messages: any = useSelector((state: RootState) => state.messages);
  if (messages.length === 0) {
    return null; // Return null to render nothing if there are no messages
  }
  const message = messages[messages.length - 1];
  if (message.text.status != 500) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>{message.text.message}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.messageText}>{message.text.message}</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffcccc',
    borderColor: '#ff9999',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,
  },

  errorMessageText: {
    color: '#ff3333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default MessageDisplay;
