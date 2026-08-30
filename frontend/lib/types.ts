import type { StaticImageData } from "next/image";

import hero1 from "../public/hero-images/hero1.jpeg"
import hero2 from "../public/hero-images/hero2.jpeg"
import hero3 from "../public/hero-images/hero3.jpeg"

export type TitleKind = "movie" | "series";

export type Title = {
    id: string;
    title: string;
    kind: TitleKind;
    year: number;
    rating: number;
    duration: string;
    genres: string[];
    description: string;
    backdrop: StaticImageData; // For now it will be static images
    // backdrop: string; // Later it will be dynamic images that will come from backend
    hue: number;

    season?: number;
    episode?: number;
}

const backdrops = [hero1, hero2, hero3];

const raw: Array<Omit<Title, "backdrop" | "hue">> = [
  {
    id: "neon-tide",
    title: "Neon Tide",
    kind: "movie",
    year: 2025,
    rating: 8.7,
    duration: "2h 14m",
    genres: ["Sci-Fi", "Thriller"],
    description:
      "A rain-drenched megacity hides a courier who can dream other people's memories. When a stolen dream turns out to be a murder confession, she has one night to outrun the corporation that authored it.",
  },
  {
    id: "dune-of-ash",
    title: "Dune of Ash",
    kind: "movie",
    year: 2024,
    rating: 8.4,
    duration: "2h 41m",
    genres: ["Adventure", "Drama"],
    description:
      "Exiled to an endless desert, a disgraced navigator searches for a buried city that may not exist — and for the brother who sold him to the sands.",
  },
  {
    id: "aurora-keep",
    title: "Aurora Keep",
    kind: "series",
    season: 2,
    episode: 15,
    year: 2026,
    rating: 9.1,
    duration: "S1 · 8 episodes",
    genres: ["Fantasy", "Mystery"],
    description:
      "Beneath the northern lights, a fortress keeps a door that must never open. A new warden discovers the previous eleven all died on the same winter night.",
  },
  {
    id: "static-hours",
    title: "Static Hours",
    kind: "series",
    year: 2025,
    rating: 8.2,
    season: 1,
    episode: 12,
    duration: "S2 · 10 episodes",
    genres: ["Drama", "Mystery"],
    description:
      "A late-night radio host starts receiving calls from listeners describing tomorrow's news. Nobody believes her until the first prediction arrives on schedule.",
  },
  {
    id: "iron-monsoon",
    title: "Iron Monsoon",
    kind: "movie",
    year: 2023,
    rating: 7.9,
    duration: "1h 58m",
    genres: ["Action", "Crime"],
    description:
      "During the heaviest monsoon in a century, an armored truck driver takes one last job and finds the whole city on the other side of it.",
  },
  {
    id: "paper-lanterns",
    title: "Paper Lanterns",
    kind: "movie",
    year: 2024,
    rating: 8.0,
    duration: "1h 47m",
    genres: ["Romance", "Drama"],
    description:
      "Two strangers agree to meet at the same festival every year, on the condition that they never learn each other's names.",
  },
  {
    id: "the-quiet-orbit",
    title: "The Quiet Orbit",
    kind: "series",
    season: 1,
    episode: 12,
    year: 2026,
    rating: 8.9,
    duration: "S1 · 6 episodes",
    genres: ["Sci-Fi", "Drama"],
    description:
      "Six caretakers wake on a station that has been circling an empty planet for two hundred years. One of them was never on the manifest.",
  },
  {
    id: "hollow-verdict",
    title: "Hollow Verdict",
    kind: "movie",
    year: 2025,
    rating: 7.6,
    duration: "2h 05m",
    genres: ["Thriller", "Crime"],
    description:
      "A defense attorney wins the case of her career, then receives evidence that she was hired to lose it.",
  },
  {
    id: "salt-and-signal",
    title: "Salt & Signal",
    kind: "series",
    season: 1,
    episode: 8,
    year: 2024,
    rating: 8.5,
    duration: "S3 · 8 episodes",
    genres: ["Mystery", "Drama"],
    description:
      "On a fog-bound island, the lighthouse keeps broadcasting a message the mainland insists was never sent.",
  },
  {
    id: "last-light-runner",
    title: "Last Light Runner",
    kind: "movie",
    year: 2026,
    rating: 8.8,
    duration: "2h 22m",
    genres: ["Action", "Sci-Fi"],
    description:
      "In a world where sunlight lasts four hours a day, the fastest courier alive races the dark to deliver a cure that expires at dusk.",
  },
  {
    id: "glass-cathedral",
    title: "Glass Cathedral",
    kind: "movie",
    year: 2023,
    rating: 7.4,
    duration: "1h 52m",
    genres: ["Drama"],
    description:
      "An architect builds a house entirely of glass to prove she has nothing to hide, and the town takes it as an invitation.",
  },
  {
    id: "midnight-cartography",
    title: "Midnight Cartography",
    kind: "series",
    season: 5,
    episode: 12,
    year: 2025,
    rating: 8.3,
    duration: "S1 · 7 episodes",
    genres: ["Adventure", "Fantasy"],
    description:
      "A mapmaker's apprentice finds streets on an old chart that only exist between 3 and 4 in the morning.",
  },
  {
    id: "ember-protocol",
    title: "Ember Protocol",
    kind: "movie",
    year: 2024,
    rating: 7.8,
    duration: "2h 09m",
    genres: ["Action", "Thriller"],
    description:
      "A retired analyst is reactivated when a decades-old failsafe starts counting down from a bunker nobody can find.",
  },
  {
    id: "the-long-thaw",
    title: "The Long Thaw",
    kind: "series",
    season: 1,
    episode: 12,
    year: 2026,
    rating: 9.0,
    duration: "S1 · 9 episodes",
    genres: ["Sci-Fi", "Mystery"],
    description:
      "As the ice retreats, a research town uncovers a settlement that predates every record of human history — and it is still warm.",
  },
  {
    id: "carousel-city",
    title: "Carousel City",
    kind: "movie",
    year: 2025,
    rating: 8.1,
    duration: "1h 41m",
    genres: ["Comedy", "Drama"],
    description:
      "A ride operator relives the same summer afternoon until he finally asks the right person the right question.",
  },
];

export const titles: Title[] = raw.map((t, i) => ({
  ...t,
  backdrop: backdrops[i % backdrops.length]!,
  hue: (i * 47) % 360,
}));

export const trending: Title[] = titles.slice(0, 10);

export const byId = (id:string) => titles.find((t) => t.id === id);

export const suggestionsFor = (id:string) => {
    const current = byId(id)

    if(!current) return titles.slice(0, 8);

    return titles.filter((t) => t.id !== id)
        .sort((a, b) => {
            const overlap = (t: Title) => t.genres.filter((g) => current.genres.includes(g)).length;

            return overlap(b) - overlap(a) || b.rating - a.rating;
        }).slice(0,8);
}

export const searchTitles = (q: string) => {
    const query = q.trim().toLocaleLowerCase();
    if(!query) return [];


    return titles.filter(
        (t) => 
            t.title.toLocaleLowerCase().includes(query) ||
            t.genres.some((g) => g.toLocaleLowerCase().includes(query))
    ).slice(0,6);
}


export const posterStyle = (t: Title) => ({
    backgroundImage: `linear-gradient(160deg, oklch(0.45 0.16 ${t.hue}), oklch(0.18 0.07 ${(t.hue + 60) % 360}))`,
})

