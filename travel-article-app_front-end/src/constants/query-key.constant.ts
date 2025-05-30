import type { PaginationParams } from "@/types/api-response.type";

export const QUERY_KEYS = {
  ARTICLE: {
    ROOT: ["article"] as const,
    GET_ALL: (params?: PaginationParams) =>
      params
        ? ([...QUERY_KEYS.ARTICLE.ROOT, "list", params] as const)
        : ([...QUERY_KEYS.ARTICLE.ROOT, "list"] as const),
    GET_ONE: (id: number) =>
      [...QUERY_KEYS.ARTICLE.ROOT, "detail", id] as const,
    UPDATE: (id: number) => [...QUERY_KEYS.ARTICLE.ROOT, "detail", id] as const,
  },
  COMMENT: {
    ROOT: ["comment"] as const,
    GET_ALL: (articleId: number) =>
      [...QUERY_KEYS.COMMENT.ROOT, "list", articleId] as const,
  },
};
