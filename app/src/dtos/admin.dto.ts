type AdminRegisterAttributes = {
    name: string
    email: string
    password: string
    organizationName: string
}

export class AdminDto {
    attributes: AdminRegisterAttributes

    constructor(attributes: { name: string; email: string; password: string; organizationName: string }) {
        this.attributes = attributes
    }
}
