import sha1 from 'sha1';
import { getApiKey, getApiSecret } from './apiValues';

const createFormDataSign = async (data) => {
  // const api_secret = process.env.REACT_APP_API_SECRET;
  // const api_key = process.env.REACT_APP_API_KEY;
  const api_key = await getApiKey();
  const api_secret = await getApiSecret();

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
