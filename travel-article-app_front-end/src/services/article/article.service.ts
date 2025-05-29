import { PROTECTED_API } from "@/constants/api.constant";
import { baseApi } from "../base-api";
import type {
  CreateArticleRequestDto,
  CreateArticleResponseDto,
  GetAllArticleResponseDto,
  GetOneArticleRequestDto,
  GetOneArticleResponseDto,
  LikeArticleRequestDto,
  LikeArticleResponseDto,
  RemoveArticleRequestDto,
  RemoveArticleResponseDto,
  UpdateArticleRequestDto,
  UpdateArticleResponseDto,
} from "./article.dto";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-key.constant";
import { createSuccessHandler } from "@/lib/utils";

interface ArticleService {
  getAll: () => Promise<GetAllArticleResponseDto>;
  getOne: (req: GetOneArticleRequestDto) => Promise<GetOneArticleResponseDto>;
  create: (req: CreateArticleRequestDto) => Promise<CreateArticleResponseDto>;
  update: (req: UpdateArticleRequestDto) => Promise<UpdateArticleResponseDto>;
  remove: (req: RemoveArticleRequestDto) => Promise<RemoveArticleResponseDto>;
  like: (req: LikeArticleRequestDto) => Promise<LikeArticleResponseDto>;
}

const articleService: ArticleService = {
  getAll: async function () {
    const response = await baseApi.get(PROTECTED_API.article.getAll_get);
    return response.data;
  },
  getOne: async function (req) {
    const response = await baseApi.get(
      PROTECTED_API.article.getOne_get.replace(":id", req.params.id.toString())
    );
    return response.data;
  },
  create: async function (req) {
    const response = await baseApi.post(
      PROTECTED_API.article.create_post,
      req.data
    );
    return response.data;
  },
  update: async function (req) {
    const response = await baseApi.patch(
      PROTECTED_API.article.update_patch.replace(
        ":id",
        req.params.id.toString()
      ),
      req.data
    );
    return response.data;
  },
  remove: async function (req) {
    const response = await baseApi.delete(
      PROTECTED_API.article.remove_delete.replace(
        ":id",
        req.params.id.toString()
      )
    );
    return response.data;
  },
  like: async function (req) {
    const response = await baseApi.post(
      PROTECTED_API.article.like_post.replace(
        ":id",
        req.params.articleId.toString()
      )
    );
    return response.data;
  },
};

export const useGetAllArticle = () =>
  useQuery({
    queryFn: articleService.getAll,
    queryKey: QUERY_KEYS.ARTICLE.GET_ALL(),
  });

export const useGetOneArticle = (req: GetOneArticleRequestDto) =>
  useQuery({
    queryFn: () => articleService.getOne(req),
    queryKey: QUERY_KEYS.ARTICLE.GET_ONE(req.params.id),
  });

export const useCreateArticle = () =>
  useMutation({
    mutationFn: articleService.create,
    onSuccess: createSuccessHandler({
      invalidateQueries: [QUERY_KEYS.ARTICLE.GET_ALL()],
    }),
  });

export const useUpdateArticle = () =>
  useMutation({
    mutationFn: articleService.update,
    onSuccess: createSuccessHandler({
      invalidateQueries: (_, req) => [
        QUERY_KEYS.ARTICLE.GET_ALL(),
        QUERY_KEYS.ARTICLE.GET_ONE(req.params.id),
      ],
    }),
  });

export const useRemoveArticle = () =>
  useMutation({
    mutationFn: articleService.remove,
    onSuccess: createSuccessHandler({
      invalidateQueries: (_, req) => [
        QUERY_KEYS.ARTICLE.GET_ALL(),
        QUERY_KEYS.ARTICLE.GET_ONE(req.params.id),
      ],
    }),
  });

export const useToggleLike = () =>
  useMutation({
    mutationFn: articleService.like,
    onSuccess: createSuccessHandler({
      invalidateQueries: (_, req) => [
        QUERY_KEYS.ARTICLE.GET_ALL(),
        QUERY_KEYS.ARTICLE.GET_ONE(req.params.articleId),
      ],
      disabledNotif: true,
    }),
  });
