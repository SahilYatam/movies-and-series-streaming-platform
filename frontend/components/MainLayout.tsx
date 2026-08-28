import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen w-full bg-background">
            <Sidebar/>

            <div className="pl-16 md:pl-56">
                <Header />

                <main>{children}</main>
            </div>

        </div>
    )
}
