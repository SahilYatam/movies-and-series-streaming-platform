import { notFound } from "next/navigation";

import { MediaWatchPage } from "@/components/watchPageComponents";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/title/${id}`,
        {
            credentials: "include",
        }
    );
    if (!response.ok) {
        notFound();
    }

    const result = await response.json();

    const title = result.data;

    if (!title || title.kind !== "movie") {
        notFound();
    }

    return <MediaWatchPage title={title} />;
}