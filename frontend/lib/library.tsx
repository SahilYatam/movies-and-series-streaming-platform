"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";


export type ListStatus = "planning" | "watching" | "completed";

export type LibraryEntry = {
    id: string;
    status: ListStatus;
    progress: number; // 0-100
    updatedAt: number;
}

type LibraryState = Record<string, LibraryEntry>;

type LibraryContextValue = {
    entries: LibraryEntry[];
    get: (id: string) => LibraryEntry | undefined;
    setStatus: (id: string, status: ListStatus) => void;
    remove: (id: string) => void;
    recordProgress: (id: string, progress: number) => void;
    clearHistory: () => void;
}

const STORAGE_KEY = "sora-library-v1";

const seed: LibraryState = {
  "aurora-keep": { id: "aurora-keep", status: "watching", progress: 62, updatedAt: Date.now() - 36e5 },
  "neon-tide": { id: "neon-tide", status: "watching", progress: 18, updatedAt: Date.now() - 9e7 },
  "paper-lanterns": {
    id: "paper-lanterns",
    status: "completed",
    progress: 100,
    updatedAt: Date.now() - 26e7,
  },
  "the-long-thaw": {
    id: "the-long-thaw",
    status: "planning",
    progress: 0,
    updatedAt: Date.now() - 4e8,
  },
  "iron-monsoon": {
    id: "iron-monsoon",
    status: "planning",
    progress: 0,
    updatedAt: Date.now() - 5e8,
  },
};

const LibraryContext = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({children}: {children: ReactNode}){
    const [state, setState] = useState<LibraryState>(seed);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if(stored) setState(JSON.parse(stored) as LibraryState);
        } catch {
            
        }
    }, [])

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        } catch {
            
        }
    },[state])

    const setStatus = useCallback((id: string, status: ListStatus) => {
        setState((prev) => ({
            ...prev,
            [id]: {
                id,
                status,
                progress: status === "completed" ? 100 : (prev[id]?.progress ?? 0),
                updatedAt: Date.now()
            }
        }))
    },[]);

    const remove = useCallback((id: string) => {
        setState((prev) => {
            const next = {...prev};
            delete next[id];
            return next;
        })
    },[])

    const recordProgress = useCallback((id: string, progress: number) => {
        setState((prev) => ({
            ...prev,
            [id]: {
                id,
                status: progress >= 98 ? "completed" : "watching",
                progress: Math.round(progress),
                updatedAt: Date.now()
            }
        }))
    }, [])

    const clearHistory = useCallback(() => setState({}), []);

    const value = useMemo<LibraryContextValue>(() => 
        ({
            entries: Object.values(state).sort((a,b) => b.updatedAt - a.updatedAt),
            get: (id: string) => state[id],
            setStatus,
            remove,
            recordProgress,
            clearHistory,
        }),
        [state, setStatus, remove, recordProgress, clearHistory]
    );

    return (
    <LibraryContext.Provider value={value}>
        {children}
    </LibraryContext.Provider>
);
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside LibraryProvider");
  return ctx;
}

export const statusLabel: Record<ListStatus, string> = {
  planning: "Planning",
  watching: "Watching",
  completed: "Completed",
};

export function timeAgo(ts: number) {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}