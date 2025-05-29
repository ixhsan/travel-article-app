import { useParams } from "react-router";
import { ArticleDetailSkeleton } from "@/components/article/article-skeleton";
import {
  useGetOneArticle,
  useToggleLike,
} from "@/services/article/article.service";
import CommentSection from "@/components/comment/comment-section";
import LikeButton from "@/components/article/like-button";
import { DEFAULT_NO_IMAGE } from "@/constants/config";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const toggleLike = useToggleLike();

  const getArticle = useGetOneArticle({
    params: {
      id: Number(id),
    },
  });

  const article = getArticle.data?.data;

  if (getArticle.isLoading || getArticle.isFetching) {
    return (
      <div className="py-8 px-4">
        <ArticleDetailSkeleton />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-2xl text-grey-300 opacity-40">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {article.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="font-medium">{article.author.name}</span>
              <span>•</span>
              <span>
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString()
                  : "Invalid Date"}
              </span>
            </div>
            <LikeButton
              isLiked={article.isLiked}
              likesCount={article.likesCount}
              onLike={async () =>
                await toggleLike.mutateAsync({
                  params: { articleId: article.id },
                })
              }
            />
          </div>
        </header>

        <img
          src={article.imageUrl}
          alt={article.title}
          className="mb-8 aspect-[16/9] w-full rounded-lg object-cover shadow-lg"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_NO_IMAGE;
            e.currentTarget.onerror = null;
            e.currentTarget.alt = "Default Image Set";
          }}
        />

        <div className="prose prose-lg mx-auto max-w-none">
          {article.content.split("\n").map(
            (paragraph, index) =>
              paragraph.trim() && (
                <p key={index} className="mb-6 text-lg leading-relaxed">
                  {paragraph.trim()}
                </p>
              )
          )}
        </div>

        <hr className="my-12 border-t border-border" />

        {id ? <CommentSection articleId={Number(id)} key={id} /> : <></>}
      </article>
    </div>
  );
}
