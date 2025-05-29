import { Comment } from 'src/modules/comment/entities/comment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ArticleLike } from './article-like.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  likesCount: number;

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => ArticleLike, (like) => like.article)
  likes: ArticleLike[];
}
