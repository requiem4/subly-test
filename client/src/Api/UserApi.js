import api from "./IndexApi";

export default class UserApi {
  static getUsers = async (params) => {
    return await api.get('/users',params).then((response) => {
      return response.data
    }).catch((response) => {
      return response
    })
  }
  static getUsersReport = async (params) => {
    return await api.get('/users/report',params).then((response) => {
      return response.data
    }).catch((response) => {
      return response
    })
  }
}
