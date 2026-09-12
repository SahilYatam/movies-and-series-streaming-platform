import type { HomeTitle } from "@/lib/services/homeApi";

function getReleaseDate(title: HomeTitle) {
    const date = title.releaseDate ?? title.firstAirDate;

    if (!date) {
        return "N/A";
    }

    return new Date(date).getFullYear();
}

export function MovieDetails({ title }: { title: HomeTitle }) {
    return (
        <aside className="space-y-3 rounded-2xl border border-border bg-surface p-4">
            <h2 className="text-xl">Details</h2>

            <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Release
                    </dt>

                    <dd>{getReleaseDate(title)}</dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Type
                    </dt>

                    <dd className="capitalize">
                        {title.kind}
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Language
                    </dt>

                    <dd className="uppercase">
                        {title.originalLanguage ?? "N/A"}
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Rating
                    </dt>

                    <dd>
                        {title.rating?.toFixed(1) ?? "N/A"}
                    </dd>
                </div>

                <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                        Adult
                    </dt>

                    <dd>
                        {title.adult ? "Yes" : "No"}
                    </dd>
                </div>
            </dl>
        </aside>
    );
}