import {AdminDto} from "../dtos/admin.dto";
import db from "../database/setup";
import {RequestErrorDto} from "../dtos/requestError.dto";
import LoginService from "./login.service";
import {RegisterResponseDto} from "../dtos/registerResponse.dto";
import OrganizationService from "./organization.service";

export class UserService {
    private static adminRole = "admin,"

    private static async checkIfUserExistsByEmail(email: string) {
        const user = await db.User.findByPk(email)
        if (user != null) {
            throw new RequestErrorDto("User already exist", 400)
        }
    }

    public async createAdmin(adminDto: AdminDto): Promise<RegisterResponseDto> {
        const {name, email, password, organizationName} = adminDto.attributes

        await UserService.checkIfUserExistsByEmail(email)

        const apiToken = await OrganizationService.registerOrganization(organizationName)
        const admin = await db.User.create({
            name: name,
            email: email,
            password: password,
            organizationName: organizationName,
            roles: UserService.adminRole,
        })

        return new RegisterResponseDto({
            roles: admin.roles,
            authToken: LoginService.generateAuthToken(admin),
            apiToken: apiToken
        })
    }
}

export default new UserService()
