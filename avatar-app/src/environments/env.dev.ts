import environment, { Environment } from "./env.base";

const baseApi = "http://localhost:8001/v1";
const env = environment(baseApi);

const devEnv: Environment = {
  ...env,
  api: {
    ...env.api,
  },
  isDevelopment: true,
};

export default devEnv;
