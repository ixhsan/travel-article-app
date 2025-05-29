import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleRequestDto {
  @ApiProperty({ example: 'Program Wajib Militer' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'program ini diwajibkan' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https:www.google.com' })
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ example: 'Program wajib militer yang ...' })
  @IsNotEmpty()
  content: string;
}

class AuthorDto {
  id: number;
  name: string;
}

export class CreateArticleResponseDto {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  likesCount: number;
  isLiked: boolean;

  @Type(() => AuthorDto)
  author: AuthorDto;
}

export class UpdateArticleRequestDto {
  @ApiProperty({ example: 'Program Wajib Militer' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'program ini diwajibkan' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https:www.google.com' })
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ example: 'Program wajib militer yang ...' })
  @IsNotEmpty()
  content: string;
}

export class UpdateArticleResponseDto {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  likesCount: number;
  isLiked: boolean;

  @Type(() => AuthorDto)
  author: AuthorDto;
}

export class LikeArticleResponseDto {
  likesCount: number;
  isLiked: boolean;
}
