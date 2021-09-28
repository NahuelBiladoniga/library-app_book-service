const roles = {
    'admin': 'admin,',
    'normalUser': 'normalUser,',
}

export function getRole(roleKey: string): string {
    const role = roles[roleKey]
    if (role == undefined) {
        throw new Error(`Key '${roleKey}' does not exist in roles.`)
    }
    return role
}
