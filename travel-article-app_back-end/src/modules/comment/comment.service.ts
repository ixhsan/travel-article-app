import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/modules/article/entities/article.entity';
import { Repository } from 'typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import {
  CreateCommentRequestDto,
  CreateCommentResponseDto,
  UpdateCommentRequestDto,
  UpdateCommentResponseDto,
} from './comment.dto';
import { toDto } from 'src/shared/utils/to-dto.utils';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async create(dto: CreateCommentRequestDto, articleId: number, user: User) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    if (!article) throw new NotFoundException('Article not found');

    const comment = this.commentRepository.create({
      ...dto,
      author: user,
      article,
    });

    const createdComment = await this.commentRepository.save(comment);

    return toDto(CreateCommentResponseDto, createdComment);
  }

  findAll(articleId: number) {
    return this.commentRepository.find({
      where: { article: { id: articleId } },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });
  }

  async update(id: number, dto: UpdateCommentRequestDto, user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });

    if (!comment) throw new NotFoundException();

    if (comment.author.id !== user.id) throw new ForbiddenException();

    Object.assign(comment, dto);
    const result = await this.commentRepository.save(comment);
    return toDto(UpdateCommentResponseDto, result);
  }

  async remove(id: number, user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });
    if (!comment) throw new NotFoundException();

    if (comment.author.id !== user.id) throw new ForbiddenException();

    return this.commentRepository.remove(comment);
  }
}
