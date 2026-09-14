"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { statusLabel, type ListStatus } from "@/lib/library";

import {
    useGetUserWatchlistQuery,
    useUpsertWatchlistMutation,
    useDeleteWatchlistTitleMutation,
} from "@/lib/services/watchlistApi";


const options: ListStatus[] = ["planning", "watching", "completed", "remove"];

export function WatchlistMenu({ id, compact = false }: { id: string; compact?: boolean }) {
    const [open, setOpen] = useState(false);

    const { data: entries = [] } = useGetUserWatchlistQuery();

    const [
        upsertWatchlist,
        { isLoading: isUpdating }
    ] = useUpsertWatchlistMutation()

    const [
        deleteWatchlistTitle,
        { isLoading: isDeleting },
    ] = useDeleteWatchlistTitleMutation();

    const titleId = Number(id);

    const entry = entries.find((entry) => entry.titleId === titleId);

    const isLoading = isUpdating || isDeleting;

    const handleStatusChange = async (status: ListStatus) => {
        if (status === "remove") {
            await deleteWatchlistTitle(titleId)
        } else {
            await upsertWatchlist({
                titleId,
                status
            })
        }

        setOpen(false)
    }

    return (
        <div
            className="relative"
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                disabled={isLoading}
                onMouseEnter={() => setOpen((o) => !o)}
                className={
                    compact
                        ? "grid size-8 place-items-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        : "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
                }
                aria-label="Add to watchlist"
            >
                {entry ? (
                    <Check className="size-4" />
                ) : (
                    <Plus className="size-4" />
                )}

                {!compact && (
                    <span>
                        {entry?.status
                            ? statusLabel[entry.status]
                            : "Add to watchlist"}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute left-0 z-30 mt-0 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                                handleStatusChange(opt)
                            }
                            className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-800 ${opt === "remove"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : ""
                                }`}
                        >
                            {statusLabel[opt]}

                            {entry?.status === opt && (
                                <Check className="size-4 text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )

}


