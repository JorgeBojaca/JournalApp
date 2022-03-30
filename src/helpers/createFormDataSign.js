import sha1 from 'sha1';
import { getApiKey, getApiSecret } from './apiValues';

const createFormDataSign = async (data) => {
  let api_key;
  let api_secret;
  if (process.env.NODE_ENV === 'test') {
    api_key = process.env.REACT_APP_API_KEY;
    api_secret = process.env.REACT_APP_API_SECRET;
  } else {
    api_key = await getApiKey();
    api_secret = await getApiSecret();
  }
  const formData = new FormData();

  let strToSign = Object.keys(data)
    .sort()
    .reduce((pVal, cVal) => {
      formData.append(cVal, data[cVal]);
      return `${pVal && pVal + '&'}${cVal}=${data[cVal]}`;
    }, '');

  strToSign += api_secret;

  formData.append('api_key', api_key);
  formData.append('signature', sha1(strToSign));

  return formData;
};
export default createFormDataSign;
