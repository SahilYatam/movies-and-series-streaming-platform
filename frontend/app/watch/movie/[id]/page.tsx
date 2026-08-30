import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { byId } from "@/lib/types";
import { MediaWatchPage } from "@/components/watchPageComponents/index";

type PageProps = {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const title = byId(id);

    if (!title) {
        return {
            title: "Unavailable — Sora",
            robots: {
                index: false,
            },
        }
    }

    return {
        title: `${title.title} (${title.year}) — Watch on Sora`,
        description: title.description.slice(0, 155),
        openGraph: {
            title: `${title.title} — Watch on Sora`,
            description: title.description.slice(0, 155),
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const title = byId(id);

    if (!title) {
        notFound();
    }

    return (
        <MediaWatchPage title={title} />
    );
}