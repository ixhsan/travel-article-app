import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDateFromArticle1748443075173 implements MigrationInterface {
    name = 'RemoveDateFromArticle1748443075173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "date" character varying NOT NULL`);
    }

}
