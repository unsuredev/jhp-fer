import environment, { Environment } from "./env.base";

const baseApi = "https://server.web.jamanenterprise.in/v1";
const env = environment(baseApi);

const devEnv: Environment = {
  ...env,
  api: {
    ...env.api,
  },
  isDevelopment: true,
};

export default devEnv;
