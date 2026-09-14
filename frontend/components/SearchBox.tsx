"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { useSearchTitlesQuery } from "@/lib/services/homeApi";

export default function SearchBox() {
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [open, setOpen] = useState(false)

    const router = useRouter();
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, 400)

        return () => clearTimeout(timer)
    }, [query])

    const {
        data: results = [],
        isFetching
    } = useSearchTitlesQuery(debouncedQuery, {
        skip: debouncedQuery.length < 2,
    })

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                boxRef.current &&
                !boxRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleSelect = (id: string, kind: "movie" | "tv") => {
        setOpen(false)
        setQuery("")
        setDebouncedQuery("")

        router.push(
            kind === "movie"
                ? `/watch/movie/${id}`
                : `/watch/tv/${id}`
        );
    }

    const getYear = (
        releaseDate: string | null,
        firstAirDate: string | null,
    ) => {
        const date = releaseDate ?? firstAirDate;

        if (!date) return "N/A";

        return new Date(date).getFullYear();
    };

    return (
        <div
            ref={boxRef}
            className="relative w-full max-w-md"
        >
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Search movies, series, genres…"
                aria-label="Search movies and series"
                className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />

            {open && debouncedQuery.length >= 2 && (
                <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-2xl">
                    {isFetching && (
                        <div className="px-3 py-3 text-sm text-muted-foreground">
                            Searching...
                        </div>
                    )}

                    {!isFetching && results.length === 0 && (
                        <div className="px-3 py-3 text-sm text-muted-foreground">
                            No titles found.
                        </div>
                    )}

                    {!isFetching &&
                        results.map((title) => (
                            <button
                                key={title.id}
                                type="button"
                                onClick={() =>
                                    handleSelect(
                                        title.id.toString(),
                                        title.kind
                                    )
                                }
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2"
                            >
                                <span>{title.title}</span>

                                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                    {title.kind} ·{" "}
                                    {getYear(
                                        title.releaseDate,
                                        title.firstAirDate
                                    )}
                                </span>
                            </button>
                        ))}
                </div>
            )}
        </div>
    )

}

