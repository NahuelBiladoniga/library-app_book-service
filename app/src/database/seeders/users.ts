import {getRole} from "../../utils/roles"

export const users = [
    {
        name: 'Santiago Toscanini',
        email: 'santi@library.com',
        password: 'secret-pass',
        organizationName: 'Aulas',
        roles: getRole('admin'),
    },
    {
        name: 'Sofia Tejerina',
        email: 'lorem@ipsum.com',
        password: 'dolor_sit_amet',
        organizationName: 'Eva',
        roles: getRole('admin'),
    }
]
