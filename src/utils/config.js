import envObject from './env';

const env = envObject || {};

export const { apiUrl, nodeEnv, port } = env;

export default {
  apiUrl,
  nodeEnv,
  port,
};
