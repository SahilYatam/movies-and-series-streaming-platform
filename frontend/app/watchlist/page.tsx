"use client";

import { TitleCard } from "@/components/TitleCard";
import { ListStatus, statusLabel, useLibrary } from "@/lib/library";
import { titles } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

const tabs: ListStatus[] = ["planning", "watching", "completed"];

export default function WatchlistPage(){
    const {entries, get} = useLibrary();
    const [tab, setTab] = useState<ListStatus>("planning");

    const items = entries
        .filter((e) => e.status === tab)
        .map((e) => titles.find((t) => t.id === e.id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t));


    return (
         <div className="mx-auto max-w-6xl space-y-6 px-6 py-8 md:px-10">
      <div>
        <h1 className="text-4xl">My watchlist</h1>
        <p className="text-sm text-muted-foreground">
          {entries.length} titles saved across your lists.
        </p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => {
          const count = entries.filter((e) => e.status === t).length;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {statusLabel[t]} ({count})
            </button>
          );
        })}
      </div>

      {items.length === 0 ? (
        <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-muted-foreground">Nothing in {statusLabel[tab].toLowerCase()} yet.</p>
          <Link href="/" className="text-sm font-medium text-primary">
            Find something to watch
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {items.map((t) => (
            <TitleCard key={t.id} title={t} progress={get(t.id)?.progress} />
          ))}
        </div>
      )}
    </div>
    )

}
