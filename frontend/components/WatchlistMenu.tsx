"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { statusLabel, useLibrary, type ListStatus } from "@/lib/library";

const options: ListStatus[] = ["planning", "watching", "completed"];

export function WatchlistMenu({id, compact = false}: {id: string; compact?: boolean}){
    const { get, setStatus, remove } = useLibrary();
    const [open, setOpen] = useState(false);
    const entry = get(id);

    return (
        <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={
                    compact
                    ? "grid size-8 place-items-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    : "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
                }
                aria-label="Add to watchlist"
            >
                {entry ? <Check className="size-4"/> : <Plus className="size-4"/>}
                {!compact && <span>{entry ? statusLabel[entry.status] : "Add to watchlist"}</span>}
            </button>

            {open && (
                <div className="absolute left-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setStatus(id, opt);
                              setOpen(false);  
                            }}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2"
                        >
                            {statusLabel[opt]}
                            {entry?.status === opt && <Check className="size-4 text-primary" />}
                        </button>
                    ))}

                    {entry && (
                        <button
                            type="button"
                            onClick={() => {
                                remove(id);
                                setOpen(false);
                            }}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-surface-2"
                        >
                            Remove
                        </button>
                    )}
                </div>
            )}

        </div>
    )

} 


