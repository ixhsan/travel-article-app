export const QUERY_KEYS = {
  ARTICLE: {
    ROOT: ["article"] as const,
    GET_ALL: () => [...QUERY_KEYS.ARTICLE.ROOT, "list"] as const,
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
