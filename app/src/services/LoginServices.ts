import {sign} from "jsonwebtoken";
import {getJWTSecretKey} from "../utils/environment";

export class LoginServices {
    static JWT_EXPIRATION_TIME = 60 * 60 * 24 // 1 day
    static JWT_SECRET_KEY: string = getJWTSecretKey()

    public static generateAuthToken(user){
        const token = sign(
            {email: user.email, roles: user.roles},
            LoginServices.JWT_SECRET_KEY,
            {expiresIn: LoginServices.JWT_EXPIRATION_TIME}
        )

        return token
    }
}
