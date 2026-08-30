import Link from "next/link";
import { Play, Star } from "lucide-react";
import { posterStyle, type Title } from "@/lib/types";
import { WatchlistMenu } from "./WatchlistMenu";


export function TitleCard({title, progress}:{title: Title; progress?: number | undefined}){
    const href = title.kind === "movie" 
    ? `/watch/movie/${title.id}`
    : `/watch/tv/${title.id}/${title.season}/${title.episode}`;

    return (
    <div className="group relative w-[168px] shrink-0">
      <Link
        href={href}
        className="block overflow-hidden rounded-xl border border-border/60"
      >
        <div
          className="relative flex aspect-2/3 flex-col justify-end p-3 transition-transform duration-300 group-hover:scale-[1.03]"
          style={posterStyle(title)}
        >
          <div className="absolute inset-0 bg-background/10 opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative font-display text-xl leading-tight text-foreground">
            {title.title}
          </span>
          <span className="relative text-[11px] uppercase tracking-widest text-foreground/70">
            {title.kind} · {title.year}
          </span>
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-[11px] text-primary">
            <Star className="size-3 fill-current" />
            {title.rating}
          </span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
              <Play className="size-5 fill-current" />
            </span>
          </span>
        </div>
        {progress !== undefined && (
          <div className="h-1 w-full bg-surface-2">
            <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        )}
      </Link>
      <div className="absolute left-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
        <WatchlistMenu id={title.id} compact />
      </div>
    </div>
  );
}

export function TitleRow({
    heading,
    items,
    progressFor
}: {
    heading: string;
    items: Title[];
    progressFor?: (id: string) => number | undefined;
}) {
    if(items.length === 0) return null;

    return (
        <section className="space-y-3">
            <h2 className="text-2xl">{heading}</h2>

            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
                {items.map((t) => (
                    <TitleCard key={t.id} title={t} progress={progressFor?.(t.id)}  />
                ))}
            </div>
        </section>
    )

}
