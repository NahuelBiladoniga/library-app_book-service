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

export function getServicesConfig() {
    return {
        reserveService: process.env.RESERVES_SERVICE_HOST,
        organizationService: process.env.ORGANIZATION_SERVICE_HOST
    }
}
