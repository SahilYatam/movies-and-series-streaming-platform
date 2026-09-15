import type { Metadata } from "next";
import { LibraryProvider } from "@/lib/library";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import { StoreProvider } from "@/store/StoreProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin"],
});

const siteUrl = "https://your-domain.com";
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: "Sora — Movies & TV Series",
        template: "%s | Sora",
    },

    description:
        "Discover movies and TV series on Sora. Browse trending, popular, and top-rated titles, explore detailed information, and pick up where you left off.",

    applicationName: "Sora",

    keywords: [
        "movies",
        "TV series",
        "movies and TV series",
        "movie streaming",
        "TV streaming",
        "watch movies",
        "watch TV series",
        "movie database",
    ],

    authors: [
        {
            name: "Sora",
        },
    ],

    creator: "Sora",
    publisher: "Sora",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
        },
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: "Sora",
        title: "Sora — Movies & TV Series",
        description:
            "Discover movies and TV series on Sora. Browse trending, popular, and top-rated titles and pick up where you left off.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Sora — Movies & TV Series",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Sora — Movies & TV Series",
        description:
            "Discover movies and TV series on Sora. Browse trending, popular, and top-rated titles.",
        images: ["/og-image.jpg"],
    },

    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },

    category: "entertainment",
};



export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
        >
            <body className={robotoCondensed.className}>
                <LibraryProvider>
                    <StoreProvider>
                        <MainLayout>
                            {children}
                        </MainLayout>
                    </StoreProvider>
                </LibraryProvider>

            </body>
        </html>
    );
}
