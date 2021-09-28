import db from "../database/setup";
import {RequestErrorDto} from "../dtos/requestError.dto";
import LoginService from "./login.service";
import {getRole} from "../utils/roles"

export class UserService {
    private static async checkIfUserExistsByEmail(email: string) {
        const user = await db.User.findByPk(email)
        if (user != null) {
            throw new RequestErrorDto("User already exist", 400)
        }
    }

    public async createUser(name: string, email: string, password: string, organizationName: string, role: string): Promise<string> {
        await UserService.checkIfUserExistsByEmail(email)

        const admin = await db.User.create({name, email, password, organizationName, roles: getRole(role)})

        return LoginService.generateAuthToken(admin)
    }
}

export default new UserService()
