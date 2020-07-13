import {Request, Response} from "express";

class ReportController {
    static async index(req: Request, res: Response) {
        return res.json({title: 'Hello from Report Controller'})
    }
}
export default ReportController