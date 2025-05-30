import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ArticleDialog } from "@/components/article/article-dialog";
import { ArticleSkeleton } from "@/components/article/article-skeleton";
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
import {
  useGetAllArticle,
  useRemoveArticle,
} from "@/services/article/article.service";
import type { Article } from "@/types/article.type";
import ArticleGrid from "@/components/article/article-grid";
import { useDebounce } from "@/lib/hooks/use-debounce";

export default function ArticlesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 700);

  const getAllArticle = useGetAllArticle({
    params: {
      page: currentPage,
      limit: pageSize,
      search: debouncedSearch,
    },
  });
  const removeArticle = useRemoveArticle();

  const articles = getAllArticle.data?.data.data ?? ([] as Article[]);
  const totalPages = getAllArticle.data?.data.total_page ?? 0;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedArticle) {
      await removeArticle.mutateAsync({
        params: {
          id: selectedArticle.id,
        },
      });

      setDeleteDialogOpen(false);
      setSelectedArticle(null);
    }
  };

  const confirmDelete = (article: Article) => {
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
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setSelectedArticle(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add Article
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getAllArticle.isLoading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))
          ) : (
            <ArticleGrid
              articles={articles}
              onDelete={(d) => confirmDelete(d)}
              onEdit={(d) => handleEdit(d)}
            />
          )}
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              article and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
