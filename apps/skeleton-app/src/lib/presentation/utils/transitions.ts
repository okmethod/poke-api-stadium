import { navigateTo, type AppPathname } from "$lib/presentation/utils/navigation";

type SymbolSrc = {
  type: "image" | "icon";
  key: string;
};

// action の種別によって target の型を絞り込む discriminated union
export type TransitionContent =
  | { label: string; symbolSrc?: SymbolSrc; action: "navigate"; target: AppPathname }
  | { label: string; symbolSrc?: SymbolSrc; action: "redirect" | "redirectNewTab"; target: string };

interface ImageConfig {
  src: string;
  alt: string;
}

interface IconConfig {
  icon: string;
}

export interface TransitionButtonConfig {
  label: string;
  symbol: ImageConfig | IconConfig | null;
  onClick: () => void;
}

export function isImageConfig(symbol: ImageConfig | IconConfig | null): symbol is ImageConfig {
  if (symbol === null) return false;
  const imageConfig = symbol as ImageConfig;
  return imageConfig.src !== undefined && imageConfig.alt !== undefined;
}

export function isIconConfig(symbol: ImageConfig | IconConfig | null): symbol is IconConfig {
  if (symbol === null) return false;
  const iconConfig = symbol as IconConfig;
  return iconConfig.icon !== undefined;
}

function getOnClick(content: TransitionContent): () => void {
  if (content.action === "navigate") return () => navigateTo(content.target);
  if (content.action === "redirect")
    return () => {
      window.location.href = content.target;
    };
  return () => window.open(content.target, "_blank");
}

export function generateButtonConfigs(
  contents: TransitionContent[],
  imageUrlDict?: Record<string, string>,
): TransitionButtonConfig[] {
  return contents.map((content) => ({
    label: content.label,
    symbol:
      content.symbolSrc !== undefined
        ? content.symbolSrc.type === "image" && imageUrlDict !== undefined
          ? {
              src: imageUrlDict[content.symbolSrc.key],
              alt: content.symbolSrc.key,
            }
          : {
              icon: content.symbolSrc.key,
            }
        : null,
    onClick: getOnClick(content),
  }));
}
