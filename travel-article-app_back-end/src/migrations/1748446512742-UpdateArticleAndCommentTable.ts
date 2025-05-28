import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArticleAndCommentTable1748446512742 implements MigrationInterface {
    name = 'UpdateArticleAndCommentTable1748446512742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c20404221e5c125a581a0d90c0e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorName"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c20404221e5c125a581a0d90c0e" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c20404221e5c125a581a0d90c0e"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c20404221e5c125a581a0d90c0e" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
