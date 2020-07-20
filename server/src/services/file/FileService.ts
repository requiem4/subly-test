import FileModel from "@models/FileModel";
import {UploadedFile} from "express-fileupload";

/**
 *
 */
interface FileServiceInterface {
    userId: number|string;
    uploadFiles(): object;
}

/**
 *
 */
class FileService {
    public userId: number = 0;
    private async saveFile(params: any) {
        let uploadingStatus;
        let file = new FileModel();
        let type = params['mimetype'].replace('video/','');
        type = type.replace('audio/','');
        if(['mp4','wav'].indexOf(type) <= -1){
            return false;
        }
        file.name = params['name'];
        file.size = params['size'];
        file.type = type;
        file.user_id = this.userId;
        if(params['upload_duration']){
            file.upload_duration = params['upload_duration'];
        }
        uploadingStatus = await file.save();
        return uploadingStatus
    }

    public async uploadFile(file: UploadedFile) {
        /*file.mv('../../../uploads',async function (err:any) {
            //await this.saveFile()
        })*/
        return await this.saveFile(file)
    }

    public async uploadFiles(files: UploadedFile[] = []) {
        let uploadingStatuses: any[] = [];
        files.map( async (file) => {
            uploadingStatuses.push(await this.uploadFile(file))
        })
        return uploadingStatuses
    }
}

export default FileService