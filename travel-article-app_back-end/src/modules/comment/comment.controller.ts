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
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateCommentRequestDto,
  UpdateCommentRequestDto,
} from './comment.dto';
import { User } from '../user/entities/user.entity';
import { SuccessMessage } from 'src/common/decorators/success-message.decorator';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @SuccessMessage('Comment added')
  @Post(':articleId')
  async create(
    @Param('articleId') articleId: number,
    @Body() dto: CreateCommentRequestDto,
    @UserDecorator() user: User,
  ) {
    const result = await this.service.create(dto, articleId, user);
    return result;
  }

  @Get(':articleId')
  findAll(@Param('articleId') articleId: number) {
    return this.service.findAll(articleId);
  }

  @SuccessMessage('Comment updated')
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
