import {NextFunction, Request, Response} from "express";
import FileModel from "@models/FileModel";
import ReportService from "@services/report/ReportService";
import upload from "@config/multer";
import path from "path";
import FileService from "@services/file/FileService";

declare global {
    namespace Express {
        interface Request {
            start: number
        }
    }
}

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

    static async afterUploading(req: Request, res: Response) {
        let user = req.user
        if (!req.files && !req.files['files'] || !user) {
            return res.status(500).json({error: 'Invalid files'});
        }

        // @ts-ignore
        let files = req.files['files'];
        const fileService = new FileService();
        // @ts-ignore
        fileService.userId = user.id ? user.id : "";
        let statuses: any[] = [];
        if (Array.isArray(files)) {
            // @ts-ignore
            statuses = await fileService.uploadFiles(files);
        } else {
            // @ts-ignore
            statuses.push(await fileService.uploadFile(files));
        }
        return res.json({status: statuses})
        const dirName = path.dirname("./")
        /*if(req.files){
            // @ts-ignore
            return await req.files['files'].mv('/home/alex/Web/subly-test.loc/server/uploads/').then( function (err) {
                console.log(err)
            })
        }*/
        return upload(req, res, (error: any) => {
            const date = new Date()
            const seconds = date.getTime() / 1000
            var time = seconds - req.start;
            /**/

            // Use the mv() method to place the file somewhere on your server
            /*sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
                if (err)
                    return res.status(500).send(err);

                res.send('File uploaded!');
            });*/

            /*if (err) {
                throw err
            }
            */

        })
    }

    static async beforeUploading(req: Request, res: Response, next: NextFunction) {
        const date = new Date()

        req.start = date.getTime() / 1000;

        next();
    }

    static async deleteFiles(req: Request, res: Response, next: NextFunction) {
        let fileIds:any;
        fileIds = req.query.files
        if (!fileIds) {
            return res.status(500).json({error: 'No files'});
        }
        let deleteStatus = await FileModel.destroy({where: {
            id: fileIds
        }})

        return res.json({status: deleteStatus});
    }
}

export default FileController