import type { ApiRequest, BaseResponse } from "@/types/api-response.type";
import type { Article } from "@/types/article.type";

// export type GetAllArticleRequestDto = ApiRequest<undefined, undefined>;

export type GetAllArticleResponseDto = BaseResponse<Article[]>;

export type GetOneArticleRequestDto = ApiRequest<undefined, { id: number }>;

export type GetOneArticleResponseDto = BaseResponse<Article>;

export type CreateArticleRequestDto = ApiRequest<
  Pick<Article, "title" | "description" | "imageUrl" | "content">,
  undefined
>;

export type CreateArticleResponseDto = BaseResponse<Article>;

export type UpdateArticleRequestDto = ApiRequest<
  Partial<Article>,
  { id: number }
>;

export type UpdateArticleResponseDto = BaseResponse<Article>;

export type RemoveArticleRequestDto = ApiRequest<undefined, { id: number }>;

export type RemoveArticleResponseDto = BaseResponse<Article>;

export type LikeArticleRequestDto = ApiRequest<
  undefined,
  { articleId: number }
>;

export type LikeArticleResponseDto = BaseResponse<Article>;
