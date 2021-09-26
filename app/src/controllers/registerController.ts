import {NextFunction, Request, Response} from 'express'
import {AdminDto} from "../dtos/AdminDto";
import {UserService} from "../services/UserService";

class RegisterController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, email, password, organization} = req.body
            const adminDto = new AdminDto({
                name: name,
                email: email,
                password: password,
                organization: organization,
            })

            let response = await UserService.createAdmin(adminDto)
            res.header('auth-token', response.attributes.authToken)
                .header('api-token', response.attributes.apiToken)
                .json({email: email, roles: response.attributes.roles})
        } catch (err) {
            next(err)
        }
    }
}

export default new RegisterController()
