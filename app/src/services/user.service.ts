import db from "../database/setup";
import {RequestErrorDto} from "../dtos/requestError.dto";
import LoginService from "./login.service";

export class UserService {
    private static adminRole = "admin,"

    private static async checkIfUserExistsByEmail(email: string) {
        const user = await db.User.findByPk(email)
        if (user != null) {
            throw new RequestErrorDto("User already exist", 400)
        }
    }

    public async createAdmin(name: string, email: string, password: string, organizationName: string,): Promise<string> {
        await UserService.checkIfUserExistsByEmail(email)

        const admin = await db.User.create({
            name: name,
            email: email,
            password: password,
            organizationName: organizationName,
            roles: UserService.adminRole,
        })

        return LoginService.generateAuthToken(admin)
    }
}

export default new UserService()
