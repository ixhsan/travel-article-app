import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useCreateComment } from "@/services/comment/comment.service";
import type { CreateCommentRequestDto } from "@/services/comment/comment.dto";
import { commentSchema, type CommentFormValues } from "@/lib/schema";

export default function CommentForm({ articleId }: { articleId: number }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const addComment = useCreateComment();

  const onSubmit = async (data: CommentFormValues) => {
    const payload = {
      content: data.comment,
    } satisfies CreateCommentRequestDto["data"];

    addComment
      .mutateAsync({
        data: payload,
        params: {
          articleId,
        },
      })
      .then(() => {
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 flex gap-4">
      <div className="flex-1">
        <Textarea
          placeholder="Write a comment..."
          className="min-h-[100px] resize-none"
          {...register("comment")}
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="flex h-10 items-center gap-2 self-start"
        disabled={addComment.isPending}
      >
        <Send className="h-4 w-4" /> Post
      </Button>
    </form>
  );
}
