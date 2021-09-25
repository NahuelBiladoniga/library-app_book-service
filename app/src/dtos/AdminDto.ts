type AdminRegisterAttributes = {
    name: string
    email: string
    password: string
    organization: string
}

export class AdminDto{
    attributes: AdminRegisterAttributes

    constructor(attributes: {name: string; email: string; password: string; organization: string}){
        this.attributes = attributes
    }
}