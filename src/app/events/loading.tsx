import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-3 h-4 w-full max-w-md" />
      </div>
      <Skeleton className="h-24 w-full rounded-2xl" />
      <div className="grid gap-5 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-52 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
