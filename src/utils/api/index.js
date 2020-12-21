import axios from 'axios';
import getArticleDataPerPage from '~/utils/api/articles';
import { apiUrl } from '~/utils/config';

const timeout = 10 * 1000;

const _instance = axios.create({
  baseURL: apiUrl,
  timeout,
});

const _call = async ({ method, url, data: dataBody }) => {
  try {
    const { data } = await _instance.request({
      data: dataBody,
      headers: '',
      method,
      url,
    });
    return data;
  } catch ({
    response: { data = { errors: { Unknown: 'an Error occured!' } } } = {},
  }) {
    throw data;
  }
};

export const get = url => _call({ method: 'GET', url });

export const post = (url, data) => _call({ data, method: 'POST', url });

export { getArticleDataPerPage };
