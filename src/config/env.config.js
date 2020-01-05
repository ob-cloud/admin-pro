const envConfig = {
  dev: {
    baseApi: 'http://localhost:3001/pro'
  },
  prod: {
   // baseApi: 'http://192.168.200.163:3000/mock/11/pro'
    baseApi: 'https://aliiot.on-bright.com/mock/13/pro'
  }
}

export function isProEnv () {
  return process.env.NODE_ENV === 'production'
}

export function getReqBaseUrl () {
  return isProEnv() ? envConfig.prod.baseApi : envConfig.dev.baseApi
}

export default envConfig
