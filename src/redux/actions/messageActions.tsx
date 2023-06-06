import {
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  Message,
} from '../types/messageActionTypes';

export const addMessage = (message: Message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});
