import { PROTECTED_API } from "@/constants/api.constant";
import { baseApi } from "../base-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-key.constant";
import type {
  CreateCommentRequestDto,
  GetAllCommentByArticleIdRequestDto,
  GetAllCommentResponseDto,
  RemoveCommentRequestDto,
  RemoveCommentResponseDto,
  UpdateCommentRequestDto,
} from "./comment.dto";
import type { CreateArticleResponseDto } from "../article/article.dto";
import { createSuccessHandler } from "@/lib/utils";

interface CommentService {
  getAllByArticleId: (
    req: GetAllCommentByArticleIdRequestDto
  ) => Promise<GetAllCommentResponseDto>;
  create: (req: CreateCommentRequestDto) => Promise<CreateArticleResponseDto>;
  update: (req: UpdateCommentRequestDto) => Promise<RemoveCommentResponseDto>;
  remove: (req: RemoveCommentRequestDto) => Promise<RemoveCommentResponseDto>;
}

const commentService: CommentService = {
  getAllByArticleId: async function (req) {
    const response = await baseApi.get(
      PROTECTED_API.comments.getAllByArticleId_get.replace(
        ":articleId",
        req.params.articleId.toString()
      )
    );
    return response.data;
  },
  create: async function (req) {
    const response = await baseApi.post(
      PROTECTED_API.comments.create_post.replace(
        ":articleId",
        req.params.articleId.toString()
      ),
      req.data
    );
    return response.data;
  },
  update: async function (req) {
    const response = await baseApi.patch(
      PROTECTED_API.comments.update_patch.replace(
        ":id",
        req.params.id.toString()
      ),
      req.data
    );
    return response.data;
  },
  remove: async function (req) {
    const response = await baseApi.delete(
      PROTECTED_API.comments.remove_delete.replace(
        ":id",
        req.params.id.toString()
      )
    );
    return response.data;
  },
};

export const useGetAllComments = (req: GetAllCommentByArticleIdRequestDto) =>
  useQuery({
    queryFn: () => commentService.getAllByArticleId(req),
    queryKey: QUERY_KEYS.COMMENT.GET_ALL(req.params.articleId),
    enabled: !!req.params.articleId,
  });

export const useCreateComment = () =>
  useMutation({
    mutationFn: commentService.create,
    onSuccess: createSuccessHandler({
      invalidateQueries: (_, req) => [
        QUERY_KEYS.COMMENT.GET_ALL(req.params.articleId),
      ],
    }),
  });

export const useUpdateComment = () =>
  useMutation({
    mutationFn: commentService.update,
    onSuccess: createSuccessHandler({
      invalidateQueries: (_, req) => [
        QUERY_KEYS.COMMENT.GET_ALL(req.params.articleId),
      ],
    }),
  });

export const useRemoveComment = () =>
  useMutation({
    mutationFn: commentService.remove,
    onSuccess: createSuccessHandler({
      invalidateQueries: (_, req) => [
        QUERY_KEYS.COMMENT.GET_ALL(req.params.articleId),
      ],
    }),
  });
