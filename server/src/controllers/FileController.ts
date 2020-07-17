import {Request, Response} from "express";
import FileModel from "@models/FileModel";
import ReportService from "@services/report/ReportService";
import FileService from "@services/file/FileService";
import upload from "@config/multer";

class FileController {
    static async index(req: Request, res: Response) {
        const files = await FileModel.findAll();
        return res.json({files: files})
    }

    static async getReport(req: Request, res: Response) {
        const reportService = new ReportService();
        const report = await reportService.getFilesReport();
        return res.json({report: report})
    }

    static async uploadFile(req: Request, res: Response) {
        return upload(req, res, async (err: any) => {
            // Use the mv() method to place the file somewhere on your server
            if (!req.files) {
                return res.status(500).json({error: 'Invalid files'});
            }
            let files = req.files.files;
            const fileService = new FileService();
            let statuses: any[] = [];
            if (Array.isArray(files)) {
                statuses = await fileService.uploadFiles(files);
            } else {
                statuses.push(await fileService.uploadFile(files));
            }

            // Use the mv() method to place the file somewhere on your server
            /*sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
                if (err)
                    return res.status(500).send(err);

                res.send('File uploaded!');
            });*/

            if (err) {
                throw err
            }
            return res.json({status: statuses})
        })
    }
}

export default FileController