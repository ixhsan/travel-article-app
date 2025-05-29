import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from 'src/modules/article/entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleLike } from './entities/article-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleLike])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
