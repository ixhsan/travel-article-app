import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from 'src/modules/article/entities/article.entity';
import {
  CreateArticleRequestDto,
  CreateArticleResponseDto,
  UpdateArticleRequestDto,
  UpdateArticleResponseDto,
  LikeArticleResponseDto,
} from './article.dto';
import { toDto } from 'src/shared/utils/to-dto.utils';
import { User } from '../user/entities/user.entity';
import { ArticleLike } from './entities/article-like.entity';
import { PaginationParams } from 'src/shared/dto/pagination.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(ArticleLike)
    private articleLikeRepository: Repository<ArticleLike>,
  ) {}

  async create(dto: CreateArticleRequestDto, user: User) {
    const article = this.articleRepository.create({ ...dto, author: user });
    const result = await this.articleRepository.save(article);
    return toDto(CreateArticleResponseDto, { ...result, isLiked: false });
  }

  async findAll(pagination: PaginationParams, user?: User) {
    const { limit, page } = pagination;
    const [articles, total] = await this.articleRepository.findAndCount({
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get all liked article
    let likedArticleIds: number[] = [];
    if (user) {
      const likes = await this.articleLikeRepository.find({
        where: { userId: user.id },
        select: ['articleId'],
      });
      likedArticleIds = likes.map((like) => like.articleId);
    }

    // fill isLiked
    return {
      data: articles.map((article) => ({
        ...article,
        isLiked: likedArticleIds.includes(article.id),
      })),
      current_page: page,
      total_page: Math.ceil(total / limit),
      page_size: limit,
      total,
    };
  }

  async findOne(id: number, user?: User) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
      select: {
        author: {
          id: true,
          name: true,
        },
      },
    });

    if (!article) return null;

    let isLiked = false;
    if (user) {
      const like = await this.articleLikeRepository.findOne({
        where: {
          userId: user.id,
          articleId: id,
        },
      });
      isLiked = !!like;
    }

    return {
      ...article,
      isLiked,
    };
  }

  async update(id: number, dto: UpdateArticleRequestDto, user: User) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!article) throw new NotFoundException();
    if (article.author.id !== user.id) throw new ForbiddenException();

    Object.assign(article, dto);
    const result = await this.articleRepository.save(article);

    return toDto(UpdateArticleResponseDto, {
      ...result,
      isLiked: false,
    });
  }

  async remove(id: number, user: User) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!article) throw new NotFoundException();

    if (article.author.id !== user.id) throw new ForbiddenException();

    return this.articleRepository.remove(article);
  }

  async toggleLike(id: number, user: User): Promise<LikeArticleResponseDto> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) throw new NotFoundException('Article not found');

    const existingLike = await this.articleLikeRepository.findOneBy({
      userId: user.id,
      articleId: article.id,
    });

    let isLiked: boolean;

    if (existingLike) {
      await this.articleLikeRepository.delete(existingLike.id);
      article.likesCount = Math.max(0, article.likesCount - 1);
      isLiked = false;
    } else {
      await this.articleLikeRepository.save({
        userId: user.id,
        articleId: article.id,
      });
      article.likesCount++;
      isLiked = true;
    }

    await this.articleRepository.save(article);

    return {
      likesCount: article.likesCount,
      isLiked,
    };
  }
}
