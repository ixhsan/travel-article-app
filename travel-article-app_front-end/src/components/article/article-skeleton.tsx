import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function ArticleSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="flex flex-1 flex-col">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="flex-1">
          <Skeleton className="h-20 w-full" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Skeleton className="h-9 w-20" />
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
              <Skeleton className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
              <Skeleton className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <div className="py-8 px-4 md:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <Skeleton className="mb-4 h-12 w-3/4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-20" />
          </div>
        </header>

        <Skeleton className="mb-8 aspect-[16/9] w-full rounded-lg" />

        <div className="prose prose-lg mx-auto max-w-none space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <hr className="my-12 border-t border-border" />

        <section className="mt-12">
          <Skeleton className="mb-6 h-8 w-48" />
          <div className="space-y-6">
            <Skeleton className="h-24 w-full rounded-lg" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
