import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from 'src/modules/article/entities/article.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { ArticleLike } from 'src/modules/article/entities/article-like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => ArticleLike, (like) => like.user)
  articleLikes: ArticleLike[];
}
