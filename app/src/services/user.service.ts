import {RequestErrorDto} from "../dtos/requestError.dto";
import LoginService from "./login.service";
import {getRole} from "../utils/roles"
import {User} from "../database/models/user.model"

export default class UserService {
    static async GetUser(email: string, password: string, organizationName: string): Promise<User> {
        const user = await User.findOne({where: {email, organizationName}})
        if (!(user && await user.validPassword(password))) {
            throw new RequestErrorDto('Bad credentials', 400)
        }
        return user
    }

    public static async createUser(name: string, email: string, password: string, organizationName: string, role: string): Promise<string> {
        await UserService.checkIfUserExistsByEmail(email, organizationName)

        const admin = await User.create({name, email, password, organizationName, roles: getRole(role)})

        return LoginService.generateAuthToken(admin)
    }

    private static async checkIfUserExistsByEmail(email: string, organizationName: string) {
        const user = await User.findOne({where: {email, organizationName}})
        if (user != null) {
            throw new RequestErrorDto("User already exist", 400)
        }
    }
}
