import { useAuthStore } from "@/lib/store";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
  className?: string;
}

export default function LikeButton({
  isLiked,
  likesCount,
  onLike,
  className,
}: LikeButtonProps) {
  const { user } = useAuthStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center gap-2 hover:bg-primary/10 hover:text-primary",
        isLiked && "text-primary",
        className
      )}
      onClick={onLike}
      disabled={!user}
      title={user ? undefined : "Please login to like articles"}
    >
      <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
      <span>{likesCount}</span>
    </Button>
  );
}
