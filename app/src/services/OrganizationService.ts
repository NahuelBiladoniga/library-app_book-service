import {getJWTSecretKey} from "../utils/environment";
import {sign} from "jsonwebtoken";
import db from "../database/setup";
import {RequestError} from "../middlewares/RequestError";

export class OrganizationService {
    static JWT_SECRET_KEY: string = getJWTSecretKey()

    private static generateApiToken(organization: string){
        const token = sign(
            {organization: organization},
            OrganizationService.JWT_SECRET_KEY
        )

        return token
    }

    // ver si necesitamos el codigo de la organización para el registro de usuarios, en el caso que la roganización existe y llego por invitación
    public static async registerOrganization(organization: string) {
        await OrganizationService.checkIsOrganizationRegister(organization)
        const apiToken = this.generateApiToken(organization)
        db.Organization.build({
            name: organization,
            apiToken: apiToken
        })

        return apiToken
    }

    private static async checkIsOrganizationRegister(organizationName: string){
        const organization = await db.Organization.findByPk(organizationName)
        if (organization != null) {
            throw new RequestError("An organization named: "+organizationName+" is already registered", 400)
        }
    }
}