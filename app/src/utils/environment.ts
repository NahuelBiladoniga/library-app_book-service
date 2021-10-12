export function isProdScope(): boolean {
    return process.env.NODE_ENV == 'production'
}

export function isIntegrationTestScope() {
    return process.env.NODE_ENV == 'integration-test'
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
        dialect: process.env.DB_DIALECT,
        logging: false,
        define: {
            timestamps: false,
        },
    }
}

export function getMemoryDBURL(): string {
    return `redis://${process.env.CACHE_HOST}:${process.env.CACHE_PORT}`
}

export function getJWTSecretKey(): string {
    let JWTSecretKey = process.env.JWT_SECRET_KEY
    if (JWTSecretKey == undefined) {
        throw new Error('Secret need to be set!')
    }
    return JWTSecretKey
}

export function getNewRelicLicenseKey(): string {
    return process.env.NEW_RELIC_LICENSE_KEY
}
