import api from "./IndexApi";

export default class FileApi {
  static getFiles = async (params) => {
    return await api.get('/files', params)
  }
  static getFilesReport = async (params) => {
    return await api.get('/files/report', params)
  }
  static uploadFiles = async (files) => {
    var formData = new FormData()
    files.forEach(function (file) {
      formData.append('files', file)
    });
    return await api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
  static deleteFiles = async (params) => {
    return await api.delete('/files', {params: params})
  }
}
