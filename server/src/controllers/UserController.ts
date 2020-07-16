import {Request, Response} from "express";
import UserModel from "@models/UserModel";
import ReportService from "@services/report/ReportService";

class UserController {
    static async index(req: Request, res: Response) {
        const users = await UserModel.findAll();
        return res.json({users: users})
    }
    static async getReport(req: Request, res: Response) {
        const reportService = new ReportService();
        const report = await reportService.getUsersReport();
        return res.json({report: report})
    }
}
export default UserController