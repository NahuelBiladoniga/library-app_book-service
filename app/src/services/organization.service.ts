import {getJWTSecretKey} from "../utils/environment";
import {sign} from "jsonwebtoken";
import {RequestErrorDto} from "../dtos/requestError.dto";
import {Organization} from "../database/models/organization.model";
import {createUUID} from "../utils/uuid";

export class OrganizationService {
    static JWT_SECRET_KEY: string = getJWTSecretKey()
    static INVITE_CODE_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 24 // 1 day

    public static async isAPITokenValid(organizationName: string, APIToken: string): Promise<boolean> {
        return await this.getAPIToken(organizationName) === APIToken
    }

    public static async getAPIToken(organizationName: string): Promise<string> {
        // TODO(santiagotoscanini): This could be cached in an in-memory DB.
        const organization = await Organization.findByPk(organizationName)
        return organization.APIToken
    }

    private static async isOrganizationRegistered(organizationName: string) {
        const organization = await Organization.findByPk(organizationName)
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
                `An organization named: '${organizationName}' is already registered`,
                400,
            )
        }

        const APIToken = createUUID()
        await Organization.create({name: organizationName, APIToken})

        return APIToken
    }

    public async regenerateOrganizationAPIToken(organizationName: string): Promise<string> {
        const organization = await Organization.findByPk(organizationName)
        if (organization == null) {
            throw new RequestErrorDto(
                `An organization named: '${organizationName}' does not exist!`,
                400,
            )
        }

        const newAPIToken = createUUID()
        organization.APIToken = newAPIToken

        // TODO(santiagotoscanini): Here we also should update the cache.
        await organization.save()

        return newAPIToken
    }
}

export default new OrganizationService()
