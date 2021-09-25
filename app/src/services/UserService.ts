import {AdminDto} from "../dtos/AdminDto";
import db from "../database/setup";
import {RequestError} from "../middlewares/RequestError";
import {LoginServices} from "./LoginServices";
import {RegisterResponseDto} from "../dtos/RegisterReponseDto";
import {OrganizationService} from "./OrganizationService";

export class UserService {
    public static async createAdmin(adminDto: AdminDto) {
        await this.checkIsUserRegister(adminDto.attributes.email)
        const apiToken = await OrganizationService.registerOrganization(adminDto.attributes.organization)

        const admin = await db.User.create({
            name: adminDto.attributes.name,
            email: adminDto.attributes.email,
            password: adminDto.attributes.password,
            organizationName: adminDto.attributes.organization,
            roles: "ADMIN"
        })

        return new RegisterResponseDto({
            roles: admin.roles,
            authToken: LoginServices.generateAuthToken(admin),
            apiToken: apiToken
        })
    }

    private static async checkIsUserRegister(email: string) {
        const user = await db.User.findByPk(email)
        if (user != null) {
            throw new RequestError("User already exist", 400)
        }
    }
}