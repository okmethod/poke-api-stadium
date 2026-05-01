import { navigateTo, type AppPathname } from "$lib/presentation/utils/navigation";

const BALL_SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

interface MenuItem {
  readonly label: string;
  readonly ballKey: string;
  readonly target: AppPathname;
}

const menuItems: MenuItem[] = [
  { label: "ポケモンえあわせ", ballKey: "repeat-ball", target: "/puzzle/eawase" },
  { label: "ポケモンめくり", ballKey: "timer-ball", target: "/puzzle/mekuri" },
  { label: "ポケモンしりとり", ballKey: "heal-ball", target: "/puzzle/shiritori" },
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
