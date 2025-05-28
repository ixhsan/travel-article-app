import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UserDecorator } from 'src/shared/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateCommentRequestDto,
  UpdateCommentRequestDto,
} from './comment.dto';
import { User } from '../user/entities/user.entity';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post(':articleId')
  async create(
    @Param('articleId') articleId: number,
    @Body() dto: CreateCommentRequestDto,
    @UserDecorator() user: User,
  ) {
    const result = await this.service.create(dto, articleId, user);
    return result;
  }

  @Get()
  findAll(@Param('articleId') articleId: number) {
    return this.service.findAll(articleId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCommentRequestDto,
    @UserDecorator() user: User,
  ) {
    return this.service.update(id, dto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @UserDecorator() user: User) {
    return this.service.remove(id, user);
  }
}
