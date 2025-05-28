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
import { UserDecorator } from 'src/shared/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Post()
  create(@Body() dto: CreateArticleRequestDto, @UserDecorator() user: User) {
    console.log({ dto, user });
    return this.articleService.create(dto, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleRequestDto,
    @UserDecorator() user: User,
  ) {
    return this.articleService.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: User) {
    return this.articleService.remove(id, user);
  }
}
