import { navigateTo, type AppPathname } from "$lib/presentation/utils/navigation";

const BALL_SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

interface MenuItemInternal {
  readonly label: string;
  readonly ballKey: string;
  readonly action: "navigate";
  readonly target: AppPathname;
}
interface MenuItemExternal {
  readonly label: string;
  readonly ballKey: string;
  readonly action: "redirectNewTab";
  readonly target: string;
}
type MenuItem = MenuItemInternal | MenuItemExternal;

const menuItems: MenuItem[] = [
  { label: "サウンドテスト", ballKey: "cherish-ball", action: "navigate", target: "/other/sound-test" },
  {
    label: "ソースコード",
    ballKey: "master-ball",
    action: "redirectNewTab",
    target: "https://github.com/okmethod/poke-api-stadium",
  },
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
      onClick: item.action === "navigate" ? () => navigateTo(item.target) : () => window.open(item.target, "_blank"),
    })),
  };
}
