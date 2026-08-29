import { Star, ThumbsUp } from "lucide-react";

import type { Title } from "@/lib/types";
import { WatchlistMenu } from "../WatchlistMenu";

export function TitleInfo({title}:{title: Title}){
    return(
        <div className="space-y-4">
      <h1 className="text-4xl md:text-5xl">
        {title.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 text-primary">
          <Star className="size-4 fill-current" />
          {title.rating}
        </span>

        <span>{title.year}</span>

        <span>{title.duration}</span>

        <span className="rounded-full border border-border px-2 py-0.5 text-xs uppercase tracking-wider">
          {title.kind}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {title.genres.map((genre) => (
          <span
            key={genre}
            className="rounded-full bg-surface-2 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground"
          >
            {genre}
          </span>
        ))}
      </div>

      <p className="max-w-2xl leading-relaxed text-muted-foreground">
        {title.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <WatchlistMenu id={title.id} />

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ThumbsUp className="size-4" />
          Like
        </button>
      </div>
    </div>
    )
}



