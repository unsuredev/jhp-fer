declare module 'environment' {
    import baseEnv from 'environments/env.base';
    const value: ReturnType<typeof baseEnv>;
  
    export default value;
  }