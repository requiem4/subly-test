import UserModel from "@models/UserModel";
import FileModel from "@models/FileModel";

/**
 *
 */
interface ReportServiceInterface {
    getUsersReport(): object;

    getFilesReport(): object;
}

/**
 *
 */
class ReportService {

    private fileReport = {
        totalFileCount: 0,
        sizePerTypes: [{
            type: FileModel.MP4_FILE_TYPE,
            maxSize: 0,
            minSize: 0,
            percent: 0
        },
            {
                type: FileModel.WAV_FILE_TYPE,
                maxSize: 0,
                minSize: 0,
                percent: 0
            }],
        maxFileSize: 0,
        minFileSize: 0,
        avgFileSize: 0
    }

    public async getUsersReport() {
        const totalUserCount = await UserModel.count();
        const report = {
            totalUserCount: totalUserCount
        }
        return report;
    }

    public async getFilesReport() {
        const totalFileCount = await FileModel.count();
        this.fileReport.sizePerTypes.map(async (fileType: any) => {
            fileType.percent = await FileModel.getFileTypePercent(fileType.type);
            const size = await FileModel.getFileTypeSizes(fileType.type);
            fileType.maxSize = size.max;
            fileType.minSize = size.min;
        })
        this.fileReport.totalFileCount = totalFileCount

        return this.fileReport;
    }
}

export default ReportService