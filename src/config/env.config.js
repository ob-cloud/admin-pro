const envConfig = {
  dev: {
    baseApi: 'http://localhost:3001'
  },
  prod: {
    baseApi: 'https://aliiot.on-bright.com'
  }
}

export function isProEnv () {
  return process.env.NODE_ENV === 'production'
}

export function getReqBaseUrl () {
  return isProEnv() ? envConfig.prod.baseApi : envConfig.dev.baseApi
}

export default envConfig
