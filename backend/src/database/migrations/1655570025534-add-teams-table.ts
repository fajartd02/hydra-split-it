import { MigrationInterface, QueryRunner } from "typeorm";

export class addTeamsTable1655570025534 implements MigrationInterface {
    name = 'addTeamsTable1655570025534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams_users" ("team_id" integer NOT NULL, "user_id" integer NOT NULL, "collab_money" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7ef73da7c71c3028ec52cd3681d" PRIMARY KEY ("team_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "teams_users" ADD CONSTRAINT "FK_29718c15b653166d708c49b357b" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams_users" ADD CONSTRAINT "FK_2a578f7a5be3b6bec99bfb8d6ac" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "teams_users"`);
        await queryRunner.query(`DROP TABLE "teams"`);
    }

}
