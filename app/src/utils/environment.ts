export function isProdScope(): boolean {
    return process.env.NODE_ENV == 'production'
}

export function isDevEnvironment(): boolean {
    return process.env.NODE_ENV == 'development'
}

export function getPort() {
    return process.env.PORT || 80
}

export function getDBConfig() {
    return {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
        dialect: process.env.DB_DIALECT
    }
}

export function getJWTSecretKey(): string {
    let JWTSecretKey = process.env.JWT_SECRET_KEY
    if (JWTSecretKey != undefined) {
        return JWTSecretKey
    } else {
        throw new Error('Secret need to be set!')
    }
}
