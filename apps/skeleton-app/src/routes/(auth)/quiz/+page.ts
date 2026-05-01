import { navigateTo, type AppPathname } from "$lib/presentation/utils/navigation";

const BALL_SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

interface MenuItem {
  readonly label: string;
  readonly ballKey: string;
  readonly target: AppPathname;
}

const menuItems: MenuItem[] = [
  { label: "ポケモンだ〜れだ？", ballKey: "dusk-ball", target: "/quiz/dareda" },
  { label: "ポケモンだ〜れだ？改", ballKey: "luxury-ball", target: "/quiz/dareda-kai" },
  { label: "たかさくらべ 改", ballKey: "ultra-ball", target: "/quiz/kurabe-h" },
  { label: "おもさくらべ 改", ballKey: "heavy-ball", target: "/quiz/kurabe-w" },
  { label: "ポケモンXXくらべ", ballKey: "great-ball", target: "/quiz/kurabe" },
];

export interface MenuButtonConfig {
  readonly label: string;
  readonly ballImageUrl: string;
  readonly onClick: () => void;
}

export function load(): { menuItems: MenuButtonConfig[] } {
  return {
    menuItems: menuItems.map((item) => ({
      label: item.label,
      ballImageUrl: `${BALL_SPRITE_BASE}/${item.ballKey}.png`,
      onClick: () => navigateTo(item.target),
    })),
  };
}
