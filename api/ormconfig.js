module.exports = {
    type: 'sqlite',
    database: "./src/database/db.sqlite",
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