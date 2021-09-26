import {getJWTSecretKey} from "../utils/environment";
import {sign} from "jsonwebtoken";
import db from "../database/setup";
import {RequestErrorDto} from "../middlewares/requestError.dto";

export class OrganizationService {
    static JWT_SECRET_KEY: string = getJWTSecretKey()
    static INVITE_CODE_EXPIRATION_TIME_IN_SECONDS = 60 * 60 * 24 // 1 day

    public static async generateInviteCode(email: string, roles: string, organizationName: string) {
        if (!await OrganizationService.isOrganizationRegister(organizationName)) {
            throw new RequestErrorDto(`"${organizationName}" is not registered`, 400)
        }
        return sign(
            {email, roles, organizationName},
            OrganizationService.JWT_SECRET_KEY,
            {expiresIn: OrganizationService.INVITE_CODE_EXPIRATION_TIME_IN_SECONDS}
        )
    }

    // ver si necesitamos el codigo de la organización para el registro de usuarios, en el caso que la roganización existe y llego por invitación
    public static async registerOrganization(organization: string) {
        if (await OrganizationService.isOrganizationRegister(organization)) {
            throw new RequestErrorDto("An organization named: " + organization + " is already registered", 400)
        }

        const apiToken = this.generateApiToken(organization)
        db.Organization.build({
            name: organization,
            apiToken: apiToken
        })

        return apiToken
    }

    private static generateApiToken(organization: string) {
        return sign(
            {organization: organization},
            OrganizationService.JWT_SECRET_KEY
        )
    }

    private static async isOrganizationRegister(organizationName: string) {
        const organization = await db.Organization.findByPk(organizationName)
        return organization != null
    }
}