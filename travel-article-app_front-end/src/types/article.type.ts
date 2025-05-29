export interface Article {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  likesCount: number;
  isLiked: boolean;
  author: {
    id: number;
    name: string;
  };
}
