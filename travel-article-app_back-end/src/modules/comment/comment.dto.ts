// create-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Article } from '../article/entities/article.entity';
import { Exclude } from 'class-transformer';

export class CreateCommentRequestDto {
  @ApiProperty({ example: 'Artikelnya bagus...' })
  @IsNotEmpty()
  content: string;
}

export class CreateCommentResponseDto {
  id: number;
  content: string;
  
  @Exclude()
  article: Article;
}

export class UpdateCommentRequestDto {
  @ApiProperty({ example: 'Artikelnya bagus, tapi...' })
  @IsOptional()
  @IsNotEmpty()
  content?: string;
}

export class UpdateCommentResponseDto {
  id: number;
  content: string;
}
