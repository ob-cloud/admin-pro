import * as Login from './login'
import * as System from './system'
// import * as Messsage from './message'

export const Api = { ...Login, ...System }

console.log(System, Api)

export default Api
