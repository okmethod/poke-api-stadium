import { navigateTo, type AppPathname } from "$lib/presentation/utils/navigation";

const BALL_SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

interface CategoryItemInternal {
  readonly label: string;
  readonly description: string;
  readonly ballKey: string;
  readonly action: "navigate";
  readonly target: AppPathname;
}
interface CategoryItemExternal {
  readonly label: string;
  readonly description: string;
  readonly ballKey: string;
  readonly action: "redirectNewTab";
  readonly target: string;
}
type CategoryItem = CategoryItemInternal | CategoryItemExternal;

const categoryItems: CategoryItem[] = [
  {
    label: "ずかん",
    description: "さがす・しらべる",
    ballKey: "poke-ball",
    action: "navigate",
    target: "/zukan",
  },
  { label: "クイズ", description: "くらべる・あてる", ballKey: "great-ball", action: "navigate", target: "/quiz" },
  { label: "パズル", description: "カード・ことば", ballKey: "ultra-ball", action: "navigate", target: "/puzzle" },
  {
    label: "その他",
    description: "サウンド・ソースコード",
    ballKey: "master-ball",
    action: "navigate",
    target: "/other",
  },
];

export interface CategoryCardConfig {
  readonly label: string;
  readonly description: string;
  readonly ballImageUrl: string;
  readonly onClick: () => void;
}

export function load(): { categories: CategoryCardConfig[] } {
  return {
    categories: categoryItems.map((item) => ({
      label: item.label,
      description: item.description,
      ballImageUrl: `${BALL_SPRITE_BASE}/${item.ballKey}.png`,
      onClick: item.action === "navigate" ? () => navigateTo(item.target) : () => window.open(item.target, "_blank"),
    })),
  };
}
