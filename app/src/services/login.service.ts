import {sign} from "jsonwebtoken";
import {getJWTSecretKey} from "../utils/environment";

export class LoginService {
    static JWT_EXPIRATION_TIME = 60 * 60 * 24 // 1 day
    static JWT_SECRET_KEY: string = getJWTSecretKey()

    public generateAuthToken(user): string {
        const {email, roles, organizationName} = user
        return sign(
            {email, roles, organizationName},
            LoginService.JWT_SECRET_KEY,
            {expiresIn: LoginService.JWT_EXPIRATION_TIME}
        )
    }
}

export default new LoginService()
