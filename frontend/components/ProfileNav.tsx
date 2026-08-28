import Link from "next/link";

export default function ProfileNav() {
  return (
    <Link
      href="/sign-in"
      className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:bg-surface"
    >
      <span className="grid size-7 place-items-center rounded-full bg-primary font-medium text-primary-foreground">
        S
      </span>

      <span className="hidden text-sm sm:inline">
        Sahil
      </span>
    </Link>
  );
}