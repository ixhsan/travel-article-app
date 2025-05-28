import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useParams } from "react-router";
import { useArticleStore } from "@/lib/store";
import { ArticleDetailSkeleton } from "@/components/article/article-skeleton";

const comments = [
  {
    id: 1,
    author: "John Smith",
    avatar: "https://source.unsplash.com/50x50/?portrait",
    content:
      "Great article! I've been to some of these places and they're truly magical.",
    date: "2024-03-16",
  },
  {
    id: 2,
    author: "Sarah Wilson",
    avatar: "https://source.unsplash.com/50x50/?woman",
    content:
      "Thanks for sharing these hidden gems. Adding them to my travel bucket list!",
    date: "2024-03-16",
  },
];

export function ArticleDetailPage() {
  const { id } = useParams();
  const { articles, isLoading } = useArticleStore();
  const article = articles.find((a) => a.id === Number(id));

  if (isLoading) {
    return (
      <div className="py-8 px-4">
        <ArticleDetailSkeleton />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>
      </div>

      <img
        src={article.imageUrl}
        alt={article.title}
        className="mb-8 h-[400px] w-full rounded-lg object-cover"
      />

      <div className="prose prose-lg max-w-none">
        {article.content.split("\n").map(
          (paragraph, index) =>
            paragraph.trim() && (
              <p key={index} className="mb-4">
                {paragraph.trim()}
              </p>
            )
        )}
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Comments</h2>

        <div className="mb-8 flex gap-4">
          <Textarea placeholder="Write a comment..." className="flex-1" />
          <Button className="flex items-center gap-2">
            <Send className="h-4 w-4" /> Post
          </Button>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <CardContent className="px-0">
                    <p className="text-muted-foreground">{comment.content}</p>
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
