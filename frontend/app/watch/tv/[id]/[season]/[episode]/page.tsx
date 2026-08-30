import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { byId } from "@/lib/types";
import { MediaWatchPage } from "@/components/watchPageComponents/index";

type PageProps = {
    params: Promise<{
        id: string;
        season: string;
        episode: string;
    }>
}


export async function generateMetadata({
    params
}: PageProps): Promise<Metadata> {
    const { id, season, episode } = await params;

    const title = byId(id);

    if (!title) {
        return {
            title: "Unavailable — Sora",
            robots: {
                index: false
            }
        }
    }

    return {
        title: `${title.title} — S${season} E${episode} — Watch on Sora`,
        description: title.description.slice(0, 155),
    }
}


export default async function TVWatchPage({
    params
}: PageProps) {
    const { id, season, episode } = await params;

    const title = byId(id);

    if (!title) {
        notFound();
    }

    return (
        <MediaWatchPage
            title={title}
            season={Number(season)}
            episode={Number(episode)}
        />
    );

}


