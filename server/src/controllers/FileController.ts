import {Request, Response} from "express";

class FileController {
    static async index(req: Request, res: Response) {
        return res.json({title: 'Hello from File Controller'})
    }
}
export default FileController