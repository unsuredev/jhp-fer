import environment, { Environment } from "./env.base";

const baseApi = "http://localhost:3001/v1";
const env = environment(baseApi);

const prodEnv: Environment = {
  ...env,
  api: {
    ...env.api,
  },
  isProduction: true,
};

export default prodEnv;
