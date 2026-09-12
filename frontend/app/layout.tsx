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

export const metadata: Metadata = {
    title: "Sora",
    description: "Sora is movies & tv series streaming platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
        >
            <body className={robotoCondensed.className}>
                <LibraryProvider>
                    <MainLayout>
                        <StoreProvider>
                            {children}
                        </StoreProvider>
                    </MainLayout>
                </LibraryProvider>
                
            </body>
        </html>
    );
}
