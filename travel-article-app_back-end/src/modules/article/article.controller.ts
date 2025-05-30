import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import {
  CreateArticleRequestDto,
  UpdateArticleRequestDto,
} from './article.dto';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { SuccessMessage } from 'src/common/decorators/success-message.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiPagination } from 'src/common/decorators/api-pagination.decorator';
import { PaginationParams } from 'src/shared/dto/pagination.dto';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @ApiPagination()
  @Get()
  findAll(
    @Query() paginationParams: PaginationParams,
    @UserDecorator() user?: User,
  ) {
    return this.articleService.findAll(paginationParams, user);
  }

  @UseGuards(JwtAuthGuard)
  @SuccessMessage('Article created successfully')
  @Post()
  create(@Body() dto: CreateArticleRequestDto, @UserDecorator() user: User) {
    return this.articleService.create(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @UserDecorator() user?: User) {
    return this.articleService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @SuccessMessage('Article updated')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleRequestDto,
    @UserDecorator() user: User,
  ) {
    return this.articleService.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @SuccessMessage('Article removed')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: User) {
    return this.articleService.remove(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  toggleLike(
    @Param('id', ParseIntPipe) id: number,
    @UserDecorator() user: User,
  ) {
    return this.articleService.toggleLike(id, user);
  }
}
