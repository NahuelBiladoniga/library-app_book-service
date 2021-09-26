import {getJWTSecretKey} from "../utils/environment";
import {sign} from "jsonwebtoken";
import db from "../database/setup";
import {RequestErrorDto} from "../dtos/requestError.dto";

export class OrganizationService {
    static JWT_SECRET_KEY: string = getJWTSecretKey()
    static INVITE_CODE_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 24 // 1 day

    private static generateApiToken(organization: string) {
        return sign(
            {organization: organization},
            OrganizationService.JWT_SECRET_KEY
        )
    }

    private static async isOrganizationRegistered(organizationName: string) {
        const organization = await db.Organization.findByPk(organizationName)
        return organization != null
    }

    public async generateInviteCode(email: string, roles: string, organizationName: string) {
        if (!await OrganizationService.isOrganizationRegistered(organizationName)) {
            throw new RequestErrorDto(`"${organizationName}" is not registered`, 400)
        }
        return sign(
            {email, roles, organizationName},
            OrganizationService.JWT_SECRET_KEY,
            {expiresIn: OrganizationService.INVITE_CODE_EXPIRATION_TIME_IN_SECONDS}
        )
    }

    public async registerOrganization(organizationName: string) {
        if (await OrganizationService.isOrganizationRegistered(organizationName)) {
            throw new RequestErrorDto(
                `An organization named: "${organizationName} is already registered`,
                400,
            )
        }

        const apiToken = OrganizationService.generateApiToken(organizationName)
        await db.Organization.create({name: organizationName, apiToken: apiToken})

        return apiToken
    }
}

export default new OrganizationService()
