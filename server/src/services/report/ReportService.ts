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
        types: {},
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
        const sizes = await FileModel.getFileTypeSizes();
        const percents = await FileModel.getFileTypePercents();
        let typesReport: any = {}
        sizes.map((fileTypeReport: any) => {
            if (!fileTypeReport.type) {
                return;
            }
            if (!typesReport[fileTypeReport.type]) {
                typesReport[fileTypeReport.type] = {}
            }
            typesReport[fileTypeReport.type] = fileTypeReport;
        })
        percents.map((filePercents: any) => {
            typesReport[filePercents.type] = {...typesReport[filePercents.type], ...filePercents};
        })
        this.fileReport.types = typesReport
        this.fileReport.totalFileCount = totalFileCount

        return this.fileReport;
    }
}

export default ReportService