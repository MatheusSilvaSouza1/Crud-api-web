module.exports = {
    type: 'sqlite',
    database: "./src/database/db.sqlite",
    logging: false,
    entities: [
        "./src/models/*.ts"
    ],
    migrations: [
        "./src/database/migrations/*.ts"
    ],
    cli: {
        entitiesDir: "./src/models",
        migrationsDir: "./src/database/migrations",
    }
}