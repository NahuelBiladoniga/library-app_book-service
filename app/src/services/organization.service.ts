import {getJWTSecretKey} from "../utils/environment";
import {sign} from "jsonwebtoken";
import {RequestErrorDto} from "../dtos/requestError.dto";
import {Organization} from "../database/models/organization.model";
import {createUUID} from "../utils/uuid";
import MemoryDB from "../cache/implementation.cache";

export class OrganizationService {
    static JWT_SECRET_KEY: string = getJWTSecretKey()
    static INVITE_CODE_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 24 // 1 day
    static ORGANIZATION_TOKEN_PREFIX = 'org_token_'

    public static async isAPITokenValid(organizationName: string, APIToken: string): Promise<boolean> {
        return await this.getAPIToken(organizationName) === APIToken
    }

    public static async getAPIToken(organizationName: string): Promise<string> {
        const tokenKey = this.orgTokenKey(organizationName);

        const cachedToken = await MemoryDB.getValue(tokenKey)
        if (cachedToken) {
            return cachedToken
        }

        const organization = await Organization.findByPk(organizationName)
        return await this.cacheToken(organization);
    }

    private static orgTokenKey(organizationName: string): string {
        return OrganizationService.ORGANIZATION_TOKEN_PREFIX + organizationName
    }

    private static async isOrganizationRegistered(organizationName: string) {
        const organization = await Organization.findByPk(organizationName)
        return organization != null
    }

    private static async cacheToken(organization: Organization) {
        const tokenKey = OrganizationService.orgTokenKey(organization.name)
        const token = organization.APIToken
        await MemoryDB.setValue(tokenKey, token)
        return token;
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

        const organization = await Organization.create({name: organizationName})

        return organization.APIToken
    }

    public async regenerateOrganizationAPIToken(organizationName: string): Promise<string> {
        const organization = await Organization.findByPk(organizationName)
        if (organization == null) {
            throw new RequestErrorDto(
                `An organization named: '${organizationName}' does not exist!`,
                400,
            )
        }

        await organization.update({APIToken: createUUID()})

        return await OrganizationService.cacheToken(organization);
    }
}

export default new OrganizationService()
