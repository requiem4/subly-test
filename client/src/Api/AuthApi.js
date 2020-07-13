import api from './IndexApi'
export default class AuthApi {
  static login = async (email, password) => {
    return await api.post('/auth/login',{email: email, password: password}).then((response) => {
      return response.data
    }).catch((response) => {
      return response
    })
  }
  static logout = async () => {
    return await api.post('/auth/logout')
  }
  static register = async(user) => {
    return await api.post('/auth/register', {user: user})
  }
}
