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
        types: {
            mp4: {
                minSize:0,
                maxSize:0,
                type: 'wav',
                size: 0,
                percent: 0,
                count: 0,
                minMb: 0,
                maxMb: 0
            },
            wav: {
                minSize:0,
                maxSize:0,
                size: 0,
                percent: 0,
                count: 0,
                minMb: 0,
                maxMb: 0
            }
        },
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
        if(Object.keys(typesReport).length > 0){
            const defaultTypes = this.fileReport.types
            this.fileReport.types = {...defaultTypes, ...typesReport}
        }
        this.fileReport.totalFileCount = totalFileCount

        return this.fileReport;
    }
}

export default ReportService