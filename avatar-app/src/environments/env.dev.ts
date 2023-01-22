import environment, { Environment } from "./env.base";

const baseApi = "http://localhost:3001/v1";
const env = environment(baseApi);

const devEnv: Environment = {
  ...env,
  api: {
    ...env.api,
  },
  isDevelopment: true,
};

export default devEnv;
