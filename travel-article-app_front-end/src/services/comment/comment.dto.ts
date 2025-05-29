import type { ApiRequest, BaseResponse } from "@/types/api-response.type";
import type { Comment } from "@/types/comment.type";

export type GetAllCommentByArticleIdRequestDto = ApiRequest<
  undefined,
  { articleId: number }
>;

export type GetAllCommentResponseDto = BaseResponse<Comment[]>;

export type CreateCommentRequestDto = ApiRequest<
  Pick<Comment, "content">,
  { articleId: number }
>;

export type CreateCommentResponseDto = BaseResponse<Comment>;

export type UpdateCommentRequestDto = ApiRequest<
  Partial<Comment>,
  { id: number; articleId: number }
>;

export type UpdateCommentResponseDto = BaseResponse<Comment>;

export type RemoveCommentRequestDto = ApiRequest<
  undefined,
  { id: number; articleId: number }
>;

export type RemoveCommentResponseDto = BaseResponse<Comment>;
