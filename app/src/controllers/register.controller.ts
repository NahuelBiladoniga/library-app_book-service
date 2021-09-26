import {NextFunction, Request, Response} from 'express'
import {AdminDto} from "../dtos/admin.dto";
import UserService from "../services/user.service";

class RegisterController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        console.log("XDDD")
        try {
            const {name, email, password, organizationName} = req.body
            const adminDto = new AdminDto({name, email, password, organizationName})

            const response = await UserService.createAdmin(adminDto)
            const {roles, authToken, apiToken} = response.attributes

            res.header('auth-token', authToken).header('api-token', apiToken).json({email, roles})
        } catch (err) {
            next(err)
        }
    }
}

export default new RegisterController()
