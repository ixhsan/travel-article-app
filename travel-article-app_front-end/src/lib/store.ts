import { create } from "zustand";
import { persist } from "zustand/middleware";
import { articles as initialArticles } from "@/data/articles";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  imageUrl: string;
  author: string;
  date: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface ArticleStore {
  articles: Article[];
  isLoading: boolean;
  addArticle: (
    article: Omit<Article, "id" | "author" | "date">
  ) => Promise<Article>;
  updateArticle: (id: number, article: Partial<Article>) => Promise<Article>;
  deleteArticle: (id: number) => Promise<void>;
}

const DEMO_USER = {
  email: "masjohn@yopmail.com",
  password: "password123",
  name: "mas John",
  id: 1,
};

// Simulated delay helper
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        await delay(1500);
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
          set({
            user: {
              id: DEMO_USER.id,
              name: DEMO_USER.name,
              email: DEMO_USER.email,
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      register: async (name: string, email: string, password: string) => {
        await delay(1500);
        if (email === DEMO_USER.email) {
          return false;
        }
        set({
          user: { id: 2, name, email },
          isAuthenticated: true,
        });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useArticleStore = create<ArticleStore>()((set, get) => ({
  articles: initialArticles,
  isLoading: false,
  addArticle: async (articleData) => {
    set({ isLoading: true });
    await delay(1500);

    const newArticle = {
      ...articleData,
      id: Math.max(...get().articles.map((a) => a.id)) + 1,
      author: get().articles[0].author,
      date: new Date().toISOString().split("T")[0],
    };

    set((state) => ({
      articles: [...state.articles, newArticle],
      isLoading: false,
    }));

    return newArticle;
  },
  updateArticle: async (id, articleData) => {
    set({ isLoading: true });
    await delay(1500);

    const updatedArticle = {
      ...get().articles.find((a) => a.id === id)!,
      ...articleData,
    };

    set((state) => ({
      articles: state.articles.map((article) =>
        article.id === id ? updatedArticle : article
      ),
      isLoading: false,
    }));

    return updatedArticle;
  },
  deleteArticle: async (id) => {
    set({ isLoading: true });
    await delay(1500);

    set((state) => ({
      articles: state.articles.filter((article) => article.id !== id),
      isLoading: false,
    }));
  },
}));
