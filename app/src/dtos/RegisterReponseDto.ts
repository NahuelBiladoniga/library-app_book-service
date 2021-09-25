type RegisterResponseAttributes = {
    roles: string
    authToken: string
    apiToken: string
}

export class RegisterResponseDto{
    attributes: RegisterResponseAttributes

    constructor(attributes: {roles: string, authToken: string, apiToken: string}){
        this.attributes = attributes
    }
}