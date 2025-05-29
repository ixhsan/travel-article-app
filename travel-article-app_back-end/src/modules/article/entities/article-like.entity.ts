import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  Column,
} from 'typeorm';
import { Article } from './article.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity()
@Unique(['userId', 'articleId'])
export class ArticleLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.articleLikes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Article, (article) => article.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'articleId' })
  article: Article;

  @Column()
  articleId: number;
}
