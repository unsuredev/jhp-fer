import environment, { Environment } from "./env.base";

const baseApi = "https://server.web.jamanenterprise.in/v1";
const env = environment(baseApi);

const prodEnv: Environment = {
  ...env,
  api: {
    ...env.api,
  },
  isProduction: true,
};

export default prodEnv;
