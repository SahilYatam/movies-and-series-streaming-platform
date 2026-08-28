import { Bell } from "lucide-react";

import SearchBox from "./SearchBox";
import ProfileNav from "./ProfileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:px-8">
      <SearchBox />

      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <Bell className="size-4" />
        </button>

        {/* Profile */}
        <ProfileNav />
      </div>
    </header>
  );
}