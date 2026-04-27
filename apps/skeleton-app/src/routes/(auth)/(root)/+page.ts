import { navigateTo, type AppPathname } from "$lib/presentation/utils/navigation";

const BALL_SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

interface MenuItemBase {
  readonly label: string;
  readonly ballKey: string;
}

type InternalMenuItem = MenuItemBase & { readonly action: "navigate"; readonly target: AppPathname };
type ExternalMenuItem = MenuItemBase & { readonly action: "redirectNewTab"; readonly target: string };
type MenuItem = InternalMenuItem | ExternalMenuItem;

const menuItems: MenuItem[] = [
  { label: "ポケモンずかん", ballKey: "poke-ball", action: "navigate", target: "/zukan" },
  { label: "ポケモンXXくらべ", ballKey: "great-ball", action: "navigate", target: "/kurabe" },
  { label: "たかさくらべ 改", ballKey: "ultra-ball", action: "navigate", target: "/kurabe-h" },
  { label: "おもさくらべ 改", ballKey: "heavy-ball", action: "navigate", target: "/kurabe-w" },
  // { label: "ポケモンタイプじゃんけん", ballKey: "fast-ball", action: "navigate", target: "/zukan" },
  { label: "ポケモンしりとり", ballKey: "heal-ball", action: "navigate", target: "/shiritori" },
  { label: "ポケモンだ〜れだ？", ballKey: "dusk-ball", action: "navigate", target: "/dareda" },
  { label: "ポケモンだ〜れだ？改", ballKey: "luxury-ball", action: "navigate", target: "/dareda-kai" },
  // { label: "ポケモンとりほうだい", ballKey: "safari-ball", action: "navigate", target: "/zukan" },
  { label: "ポケモンえあわせ", ballKey: "repeat-ball", action: "navigate", target: "/eawase" },
  // { label: "しさくひん", ballKey: "premier-ball", action: "navigate", target: "/zukan" },
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
