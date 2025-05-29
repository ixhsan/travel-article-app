import { useState } from "react";
import { Button } from "../ui/button";
import { useGetAllComments } from "@/services/comment/comment.service";
import LoadingSpinner from "../common/loading-spinner";
import CommentList from "./comment-list";
import type { Comment } from "@/types/comment.type";
import CommentForm from "./comment-form";

export default function CommentSection({ articleId }: { articleId: number }) {
  const getAllComments = useGetAllComments({
    params: {
      articleId,
    },
  });

  const comments = getAllComments.data?.data ?? ([] as Comment[]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  const totalPages = Math.ceil(comments?.length / commentsPerPage);
  
  // Calculate pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments?.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  if (getAllComments.isLoading || getAllComments.isFetching) {
    return <LoadingSpinner label="Loading comments..." />;
  }

  return (
    <section className="mt-12">
      <h2 className="mb-6 font-display text-2xl font-semibold">
        Comments ({comments?.length})
      </h2>
      <CommentForm key={articleId} articleId={articleId} />
      <CommentList comments={currentComments} articleId={articleId} />

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index + 1}
              variant="outline"
              size="sm"
              className={
                currentPage === index + 1
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
