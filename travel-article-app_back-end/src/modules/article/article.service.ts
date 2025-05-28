import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from 'src/modules/article/entities/article.entity';
import {
  CreateArticleRequestDto,
  CreateArticleResponseDto,
  UpdateArticleRequestDto,
  UpdateArticleResponseDto,
} from './article.dto';
import { toDto } from 'src/shared/utils/to-dto.utils';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(dto: CreateArticleRequestDto, user: User) {
    const article = this.articleRepository.create({ ...dto, author: user });
    const result = await this.articleRepository.save(article);
    return toDto(CreateArticleResponseDto, result);
  }

  async findAll() {
    const result = await this.articleRepository.find({
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });

    return result;
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });
  }

  async update(id: number, dto: UpdateArticleRequestDto, user: User) {
    const article = await this.findOne(id);
    if (article?.author.id !== user.id) throw new ForbiddenException();
    Object.assign(article, dto);
    const result = this.articleRepository.save(article);
    return toDto(UpdateArticleResponseDto, result);
  }

  async remove(id: number, user: User) {
    const article = await this.findOne(id);
    if (article?.author.id !== user.id) throw new ForbiddenException();
    return this.articleRepository.remove(article);
  }
}
