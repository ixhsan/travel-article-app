import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(@UserDecorator() user?: User) {
    return this.articleService.findAll(user);
  }

  @SuccessMessage('Article created successfully')
  @Post()
  create(@Body() dto: CreateArticleRequestDto, @UserDecorator() user: User) {
    return this.articleService.create(dto, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @UserDecorator() user?: User) {
    return this.articleService.findOne(id, user);
  }

  @SuccessMessage('Article updated')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleRequestDto,
    @UserDecorator() user: User,
  ) {
    return this.articleService.update(id, dto, user);
  }

  @SuccessMessage('Article removed')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: User) {
    return this.articleService.remove(id, user);
  }

  @Post(':id/like')
  toggleLike(
    @Param('id', ParseIntPipe) id: number,
    @UserDecorator() user: User,
  ) {
    return this.articleService.toggleLike(id, user);
  }
}
