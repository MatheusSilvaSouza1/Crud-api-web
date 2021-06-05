import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueForField1622932632588 implements MigrationInterface {
    name = 'AddUniqueForField1622932632588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "login" varchar NOT NULL UNIQUE, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL, "nameMother" varchar NOT NULL, "inclusionDate" datetime, "changeDate" datetime, "disabled" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled") SELECT "id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "login" varchar NOT NULL UNIQUE, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL, "nameMother" varchar NOT NULL, "inclusionDate" datetime, "changeDate" datetime, "disabled" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_4c71b2be36b8975b58bc78d89ae" UNIQUE ("login"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled") SELECT "id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "login" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL, "nameMother" varchar NOT NULL, "inclusionDate" datetime, "changeDate" datetime, "disabled" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled") SELECT "id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "login" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL, "nameMother" varchar NOT NULL, "inclusionDate" datetime, "changeDate" datetime, "disabled" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled") SELECT "id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate", "disabled" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
