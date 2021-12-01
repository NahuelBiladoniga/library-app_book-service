import {getServicesConfig} from "../utils/environment";
import {RequestErrorDto} from "../dtos/requestError.dto";
import {Organization} from "../database/models/organization.model";
import axios from "axios";

export class OrganizationService {
    public static async createOrganization(organizationName: string): Promise<void> {
        try {
            if(await this.isOrganizationRegistered(organizationName)){
                return;
            }

            const organizationServiceHost = getServicesConfig().organizationService
            const response = await axios({
                method: 'get',
                url: `http://${organizationServiceHost}:80/organizations/${organizationName}`,
            })
            console.log(response)
            if (response.status < 400) {
                const {name, APIToken} = response.data
                await Organization.create({name: name, APIToken: APIToken});
                return;
            }
        } catch(e) {
            console.log(e)
            throw new RequestErrorDto(
                `Could not connect to organization service`,
                500,
            )
        }
    }

    static async isOrganizationRegistered(name: string): Promise<boolean> {
        const org = await Organization.findOne({where: { name}})
        return org != null
    }
}

export default new OrganizationService()
