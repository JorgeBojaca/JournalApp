import { db } from '../firebase/firebase-config';

export const getApiKey = async () => {
  const api_key = await db.collection('api').doc('key').get();
  return api_key.data().val;
};

export const getApiSecret = async () => {
  const api_secret = await db.collection('api').doc('secret').get();
  return api_secret.data().val;
};
