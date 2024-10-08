import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionProps, VerifyProps, User } from '../Types/types';
import { Local_IP } from '@env';

const IP = Local_IP;
export const createSession = async ({
  email,
  password
}: SessionProps): Promise<string | null> => {
  try {
    const response = await fetch(`http://${IP}:3000/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      Alert.alert('Error', errorData.error || 'Login failed.');
      return null;
    }

    const responseData = await response.json();
    const token = responseData.token;

    await AsyncStorage.setItem('userToken', token);

    return token;
  } catch (error) {
    console.error('Error creating session:', error);
    Alert.alert('Error', 'An error occurred. Please try again.');
    return null;
  }
};

export const verifySession = async ({
  token
}: VerifyProps): Promise<string | null> => {
  try {
    const verifyResponse = await fetch(`http://${IP}:3000/sessions/${token}`);

    if (!verifyResponse.ok) {
      Alert.alert('Error', 'Failed to verify token.');
      return null;
    }
    const verifyResponseData = await verifyResponse.json();

    const userId = verifyResponseData.userId;

    await AsyncStorage.setItem('userId', userId);
    return 'verified';
  } catch (error) {
    console.error('Error creating session:', error);
    Alert.alert('Error', 'An error occurred. Please try again.');
    return null;
  }
};

export const checkUsers = async (): Promise<User[] | null> => {
  try {
    const response1 = await fetch(`http://${IP}:3000/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response1.ok) {
      const errorData = await response1.json();
      Alert.alert('Error', errorData.error || 'Sign-up failed.');
      return null;
    }

    const users: User[] = await response1.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    Alert.alert('Error', 'An error occurred. Please try again.');
    return null;
  }
};

export const addUserToDB = async ({
  email,
  password
}: SessionProps): Promise<string | null> => {
  const response2 = await fetch(`http://${IP}:3000/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: email, password })
  });

  if (!response2.ok) {
    const errorData = await response2.json();
    Alert.alert('Error', errorData.error || 'Sign-up failed.');
    return null;
  }
  return 'success';
};
