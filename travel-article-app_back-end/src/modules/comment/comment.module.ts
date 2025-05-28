import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { ArticleModule } from 'src/modules/article/article.module';
import { Article } from 'src/modules/article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article]), ArticleModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
