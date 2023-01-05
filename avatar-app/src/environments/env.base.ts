/**
 * Base is the default environments
 * Add everything here and override values in other files if needed
 */

export default function baseEnv(baseApi:string) {
    return {
        isProduction:false,
        isDevelopment:false,
        api:{
            base:baseApi
        }
    }
}

export type Environment = ReturnType<typeof baseEnv>;