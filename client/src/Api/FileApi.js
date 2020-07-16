import api from "./IndexApi";

export default class FileApi {
  static getFiles = async (params) => {
    return await api.get('/files', params).then((response) => {
      return response.data
    }).catch((response) => {
      return response
    })
  }
  static getFilesReport = async (params) => {
    return await api.get('/files/report', params).then((response) => {
      return response.data
    }).catch((response) => {
      return response
    })
  }
  static uploadFiles = async (files) => {
    var formData = new FormData()
    files.map((file) => {
      formData.append('files', file)
    })
    return await api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then((response) => {
      return response.data
    }).catch((response) => {
      return response
    })
  }
}
