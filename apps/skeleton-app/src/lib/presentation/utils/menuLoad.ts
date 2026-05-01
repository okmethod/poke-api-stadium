import { buildOnClick, type ActionTarget } from "$lib/presentation/utils/navigation";
import { itemSpriteUrl } from "$lib/infrastructure/api/pokeSprites";

/** メニュー項目の定義型 */
export type MenuItemDef = {
  readonly label: string;
  readonly description?: string;
  readonly iconItemKey: string;
} & ActionTarget;

/** メニューボタンの表示設定 */
export interface MenuButtonConfig {
  readonly label: string;
  readonly description?: string;
  readonly iconItemKey: string;
  readonly onClick: () => void;
}

/** MenuItemDef の配列から load() の戻り値を構築する */
export function buildMenuLoad(items: MenuItemDef[]): { menuItems: MenuButtonConfig[] } {
  return {
    menuItems: items.map((item) => ({
      label: item.label,
      ...(item.description !== undefined && { description: item.description }),
      iconItemKey: itemSpriteUrl(item.iconItemKey),
      onClick: buildOnClick(item),
    })),
  };
}
