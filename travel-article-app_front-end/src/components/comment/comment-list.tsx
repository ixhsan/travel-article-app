import { useState } from "react";
import type { Comment } from "@/types/comment.type";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import {
  useRemoveComment,
  useUpdateComment,
} from "@/services/comment/comment.service";
import { Textarea } from "../ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface CommentListProps {
  comments: Comment[];
  articleId: number;
}

export default function CommentList({ comments, articleId }: CommentListProps) {
  const { user } = useAuthStore();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

  const updateComment = useUpdateComment();
  const removeComment = useRemoveComment();

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleSaveEdit = async (commentId: number) => {
    try {
      await updateComment.mutateAsync({
        data: { content: editContent },
        params: { id: commentId, articleId },
      });
      setEditingCommentId(null);
      setEditContent("");
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const confirmDelete = (commentId: number) => {
    setSelectedCommentId(commentId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedCommentId) {
      try {
        await removeComment.mutateAsync({
          params: { id: selectedCommentId, articleId },
        });
        setDeleteDialogOpen(false);
        setSelectedCommentId(null);
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  if (!comments.length) {
    return (
      <div className="py-8 px-4 text-center">
        <h1 className="text-2xl text-grey-300 opacity-40">No Comment</h1>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="bg-card/50">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <Avatar>
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{comment.author.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {comment
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : "Invalid Date"}
                  </span>
                </div>
                <CardContent className="px-0 pt-2">
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(comment.id)}
                          disabled={updateComment.isPending}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="group relative">
                      <p className="text-muted-foreground">{comment.content}</p>
                      {user?.id === comment.author.id && (
                        <div className="absolute right-0 top-0 hidden gap-1 group-hover:flex">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-accent/10 hover:text-accent"
                            onClick={() => handleEdit(comment)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit comment</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => confirmDelete(comment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete comment</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
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
