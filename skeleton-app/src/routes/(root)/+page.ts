import type { TransitionContent, TransitionButtonConfig } from "$lib/utils/transitions";
import { generateButtonConfigs } from "$lib/utils/transitions";
import { fetchBall } from "$lib/constants/fetchStaticData";
import { GITHUB_REPO_URL, POKENATOR_URL } from "$lib/constants/common";

const contentLinks: TransitionContent[] = [
  {
    label: "ポケモンずかん",
    symbolSrc: { type: "image", key: "poke-ball" },
    action: "navigate",
    target: "/zukan",
  },
  {
    label: "ポケモンXXくらべ",
    symbolSrc: { type: "image", key: "great-ball" },
    action: "navigate",
    target: "/kurabe",
  },
  {
    label: "ポケモンたかさくらべ 改",
    symbolSrc: { type: "image", key: "ultra-ball" },
    action: "navigate",
    target: "/kurabe-h",
  },
  {
    label: "ポケモンおもさくらべ 改",
    symbolSrc: { type: "image", key: "heavy-ball" },
    action: "navigate",
    target: "/kurabe-w",
  },
  {
    label: "ポケモンタイプじゃんけん",
    symbolSrc: { type: "image", key: "fast-ball" },
    action: "navigate",
    target: "/janken",
  },
  {
    label: "ポケモンしりとり",
    symbolSrc: { type: "image", key: "heal-ball" },
    action: "navigate",
    target: "/shiritori",
  },
  {
    label: "ポケモンだ〜れだ？",
    symbolSrc: { type: "image", key: "dusk-ball" },
    action: "navigate",
    target: "/dareda",
  },
  {
    label: "ポケモンだ〜れだ？ 改",
    symbolSrc: { type: "image", key: "luxury-ball" },
    action: "redirect",
    target: `${POKENATOR_URL}/dareda`,
  },
  {
    label: "ポケモンとりほうだい",
    symbolSrc: { type: "image", key: "safari-ball" },
    action: "navigate",
    target: "/hodai",
  },
  {
    label: "ポケモンえあわせ",
    symbolSrc: { type: "image", key: "repeat-ball" },
    action: "navigate",
    target: "/eawase",
  },
  {
    label: "ポケネイター",
    symbolSrc: { type: "image", key: "luxury-ball" },
    action: "redirect",
    target: POKENATOR_URL,
  },
  {
    label: "しさくひん",
    symbolSrc: { type: "image", key: "premier-ball" },
    action: "navigate",
    target: "/prototype",
  },
  {
    label: "ソースコード",
    symbolSrc: { type: "image", key: "master-ball" },
    action: "redirectNewTab",
    target: GITHUB_REPO_URL,
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
