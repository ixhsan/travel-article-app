import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ArticleDialog } from "@/components/article/article-dialog";
import { ArticleSkeleton } from "@/components/article/article-skeleton";
import { useArticleStore } from "@/lib/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const { articles, isLoading, deleteArticle } = useArticleStore();
  const itemsPerPage = 6;

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleEdit = (article: any) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedArticle) {
      await deleteArticle(selectedArticle.id);
      setDeleteDialogOpen(false);
      setSelectedArticle(null);
    }
  };

  const confirmDelete = (article: any) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 sm:max-w-sm">
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedArticle(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add Article
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <ArticleSkeleton key={index} />
              ))
            : currentArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <Link to={`/articles/${article.id}`}>
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="h-48 w-full object-cover transition-transform hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <CardHeader>
                    <Link to={`/articles/${article.id}`}>
                      <CardTitle className="line-clamp-2 hover:text-primary">
                        {article.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      By {article.author} •{" "}
                      {new Date(article.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {article.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => confirmDelete(article)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant="outline"
                className={
                  currentPage === number
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <ArticleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        article={selectedArticle}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              article and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
