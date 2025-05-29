import { DEFAULT_NO_IMAGE } from "@/constants/config";
import type { Article } from "@/types/article.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router";
import { useAuthStore } from "@/lib/store";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import LikeButton from "./like-button";
import { useToggleLike } from "@/services/article/article.service";

interface ArticleGridProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}

export default function ArticleGrid({
  articles,
  onDelete,
  onEdit,
}: ArticleGridProps) {
  const { user } = useAuthStore();
  const toggleLike = useToggleLike();

  return (
    <>
      {articles.map((article) => (
        <Card key={article.id} className="flex flex-col overflow-hidden">
          <Link to={`/articles/${article.id}`}>
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-48 w-full object-cover transition-transform hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_NO_IMAGE;
                e.currentTarget.onerror = null;
                e.currentTarget.alt = "Default Image Set";
              }}
            />
          </Link>
          <div className="flex flex-1 flex-col">
            <CardHeader>
              <Link to={`/articles/${article.id}`}>
                <CardTitle className="line-clamp-2 hover:text-primary">
                  {article.title}
                </CardTitle>
              </Link>
              <CardDescription className="flex items-center gap-2 text-sm">
                By {article.author.name} •{" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {article.description}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <LikeButton
                isLiked={article.isLiked}
                likesCount={article.likesCount}
                onLike={async () =>
                  await toggleLike.mutateAsync({
                    params: { articleId: article.id },
                  })
                }
              />
              {user?.id === article.author.id && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-accent/10 hover:text-accent"
                    onClick={() => onEdit(article)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit article</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => onDelete(article)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete article</span>
                  </Button>
                </div>
              )}
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
}
