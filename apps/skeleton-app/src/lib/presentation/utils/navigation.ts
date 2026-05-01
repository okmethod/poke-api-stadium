import { goto } from "$app/navigation";
import { resolve } from "$app/paths";
import type { AppTypes } from "$app/types";

type GotoOptions = Parameters<typeof goto>[1];

/** アプリ内の有効なパス名（SvelteKitのルートから自動生成） */
export type AppPathname = ReturnType<AppTypes["Pathname"]>;

/** base path を考慮したナビゲーション */
export function navigateTo(path: AppPathname, options?: GotoOptions): Promise<void> {
  return goto(resolve(path), options);
}

/** クリック時のナビゲーション先（アプリ内遷移 or 新タブ外部リンク） */
export type ActionTarget =
  | { readonly action: "navigate"; readonly target: AppPathname }
  | { readonly action: "redirectNewTab"; readonly target: string };

/** ActionTarget に応じたクリックハンドラーを生成する */
export function buildOnClick(item: ActionTarget): () => void {
  return item.action === "navigate" ? () => navigateTo(item.target) : () => window.open(item.target, "_blank");
}
