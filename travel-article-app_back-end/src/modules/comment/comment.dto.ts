// create-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentRequestDto {
  @ApiProperty({ example: 'Artikelnya bagus...' })
  @IsNotEmpty()
  content: string;
}

export class CreateCommentResponseDto {
  id: number;
  content: string;
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
