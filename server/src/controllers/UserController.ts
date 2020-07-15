import {Request, Response} from "express";
import UserModel from "@models/UserModel";

class UserController {
    static async index(req: Request, res: Response) {
        const users = await UserModel.findAll();
        return res.json({users: users})
    }
}
export default UserController