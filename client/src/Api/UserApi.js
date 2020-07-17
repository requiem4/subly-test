import api from "./IndexApi";

export default class UserApi {
  static getUsers = async (params) => {
    return await api.get('/users',params)
  }
  static getUsersReport = async (params) => {
    return await api.get('/users/report',params)
  }
}
