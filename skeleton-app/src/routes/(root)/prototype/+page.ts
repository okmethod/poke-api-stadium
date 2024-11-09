import type { TransitionContent, TransitionButtonConfig } from "$lib/utils/transitions";
import { generateButtonConfigs } from "$lib/utils/transitions";
import { fetchBall } from "$lib/constants/fetchStaticData";
import { MATTER_PROTOTYPE_URL, AMMO_PROTOTYPE_URL, PGM_BOY_ADVANCE_URL, MASTER_DRILL_URL } from "$lib/constants/common";

const contentLinks: TransitionContent[] = [
  {
    label: "2D物理エンジン",
    symbolSrc: { type: "image", key: "premier-ball" },
    action: "redirectNewTab",
    target: MATTER_PROTOTYPE_URL,
  },
  {
    label: "3D物理エンジン + 3D描画",
    symbolSrc: { type: "image", key: "premier-ball" },
    action: "redirectNewTab",
    target: AMMO_PROTOTYPE_URL,
  },
  {
    label: "プログラミング教材",
    symbolSrc: { type: "image", key: "premier-ball" },
    action: "redirectNewTab",
    target: PGM_BOY_ADVANCE_URL,
  },
  {
    label: "自学マスタードリル",
    symbolSrc: { type: "image", key: "premier-ball" },
    action: "redirectNewTab",
    target: MASTER_DRILL_URL,
  },
];

export async function load(): Promise<{ buttonConfigs: TransitionButtonConfig[] }> {
  const ballImages = await Promise.all(
    contentLinks.map((content) =>
      content.symbolSrc && content.symbolSrc.key ? fetchBall(content.symbolSrc.key) : null,
    ),
  );
  const ballImageDict: Record<string, string> = contentLinks.reduce(
    (acc, content, index) => {
      if (content.symbolSrc && content.symbolSrc.key && ballImages[index] !== null) {
        acc[content.symbolSrc.key] = ballImages[index].imageUrl;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
  const buttonConfigs = generateButtonConfigs(contentLinks, ballImageDict);

  return { buttonConfigs };
}
