import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const article = {
  id: 1,
  title: "Exploring the Hidden Beaches of Bali",
  content: `
    Bali, known for its pristine beaches and vibrant culture, holds many secrets waiting to be discovered. 
    Away from the bustling tourist spots lie hidden gems that offer a more authentic and peaceful experience.
    
    In this article, we'll explore some of the most secluded and beautiful beaches that most visitors never get to see. 
    From the black sand beaches of the north to the pristine white shores of the east, each location offers its own unique charm.
    
    What makes these hidden beaches special isn't just their natural beauty, but the journey to reach them. 
    Often requiring local knowledge and a sense of adventure, these destinations reward explorers with unforgettable experiences.
  `,
  image: "https://source.unsplash.com/1600x900/?bali,beach",
  author: "Jane Doe",
  date: "2024-03-15",
  comments: [
    {
      id: 1,
      author: "John Smith",
      avatar: "https://source.unsplash.com/50x50/?portrait",
      content:
        "Great article! I've been to some of these beaches and they're truly magical.",
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
  ],
};

export function ArticleDetailPage() {
  return (
    <div className="container py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Image */}
      <img
        src={article.image}
        alt={article.title}
        className="mb-8 h-[400px] w-full rounded-lg object-cover"
      />

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {article.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Comments</h2>

        {/* Form */}
        <div className="mb-8 flex gap-4">
          <Textarea placeholder="Write a comment..." className="flex-1" />
          <Button className="flex items-center gap-2">
            <Send className="h-4 w-4" /> Post
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {article.comments.map((comment) => (
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
