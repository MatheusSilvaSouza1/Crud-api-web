import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUser1622725873634 implements MigrationInterface {
    name = 'CreateTableUser1622725873634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "login" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "cpf" varchar NOT NULL, "birthDate" datetime NOT NULL, "nameMother" varchar NOT NULL, "inclusionDate" datetime NOT NULL, "changeDate" datetime NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
