import FileModel from "@models/FileModel";
import {UploadedFile} from "express-fileupload";

/**
 *
 */
interface FileServiceInterface {

    uploadFiles(): object;
}

/**
 *
 */
class FileService {

    private async saveFile(params: [] = []) {
        let uploadingStatus = {}
        let file = new FileModel(params);
        const saved = await file.save();
        return uploadingStatus
    }

    public async uploadFile(file: UploadedFile) {
        let status: any[] = [];
        file.mv('../../../uploads',async function (err:any) {
            status.push([1]);
            //await this.saveFile()
        })
        return status
    }

    public async uploadFiles(files: UploadedFile[] = []) {
        let uploadingStatuses: any[] = [];
        files.map((file) => {
            uploadingStatuses.push(this.uploadFile(file))
        })
        return uploadingStatuses
    }
}

export default FileService