import { isClient } from './helpers';

const appEnvironment = isClient()
  ? window.__Env__
  : {
      apiUrl: `${process.env.API_URL}`,
      nodeEnv: `${process.env.NODE_ENV}`,
      port: `${process.env.PORT}`,
    };

export default appEnvironment;
