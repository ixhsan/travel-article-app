import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':articleId')
  findAll(@Param('articleId') articleId: number) {
    return this.service.findAll(articleId);
  }

  @UseGuards(JwtAuthGuard)
  @SuccessMessage('Comment updated')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCommentRequestDto,
    @UserDecorator() user: User,
  ) {
    return this.service.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @UserDecorator() user: User) {
    return this.service.remove(id, user);
  }
}
