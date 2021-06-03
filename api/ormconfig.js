module.exports ={
    type: 'sqlite',
    database: "./src/database/db.sqlite",
    entities: [
        "./src/database/models/*.ts"
    ],
    migrations: [
        "./src/database/migrations/*.ts"
    ],
    cli: {
        entitiesDir: "entity",
        migrationsDir: "migration",
        subscribersDir: "subscriber"
    }
}