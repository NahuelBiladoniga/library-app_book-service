const roles = {
    'admin': 'admin,',
    'normal': 'normal,',
}

export function getRole(roleKey: string): string {
    const role = roles[roleKey]
    if (role == undefined) {
        throw new Error(`Key '${roleKey}' does not exist in roles.`)
    }
    return role
}
