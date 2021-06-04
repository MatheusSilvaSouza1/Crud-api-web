import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveFieldInactive1622817786273 implements MigrationInterface {
    name = 'RemoveFieldInactive1622817786273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "login" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL, "nameMother" varchar NOT NULL, "inclusionDate" datetime, "changeDate" datetime, "disabled" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate") SELECT "id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "login" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL, "nameMother" varchar NOT NULL, "inclusionDate" datetime, "changeDate" datetime)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate") SELECT "id", "name", "login", "password", "email", "phone", "cpf", "birthDate", "nameMother", "inclusionDate", "changeDate" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
