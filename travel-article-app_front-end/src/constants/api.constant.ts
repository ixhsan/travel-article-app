export const PUBLIC_API = {
  login_post: "/auth/login",
  register_post: "/auth/register",
} as const;

export const PROTECTED_API = {
  article: {
    getAll_get: "/articles",
    getOne_get: "/articles/:id",
    create_post: "/articles",
    update_patch: "/articles/:id",
    remove_delete: "/articles/:id",
    like_post: "/articles/:id/like",
  },
  comments: {
    getAllByArticleId_get: "/comments/:articleId",
    create_post: "/comments/:articleId",
    update_patch: "/comments/:id",
    remove_delete: "/comments/:id",
  },
} as const;
