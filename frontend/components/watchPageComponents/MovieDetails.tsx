import type { Title } from "@/lib/types";

export function MovieDetails({ title }: { title: Title }) {
    return (
        <aside className="space-y-3 rounded-2xl border border-border bg-surface p-4">
            <h2 className="text-xl">Details</h2>
            <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Release
                    </dt>
                    <dd>{title.year}</dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Runtime
                    </dt>
                    <dd>{title.duration}</dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Genres
                    </dt>
                    <dd className="text-right">
                        {title.genres.join(", ")}
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Audio
                    </dt>
                    <dd>English · 5.1</dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Quality
                    </dt>
                    <dd>4K HDR</dd>
                </div>
            </dl>
        </aside>
    )
}

