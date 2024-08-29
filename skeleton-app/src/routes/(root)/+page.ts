import type { ContentLink, TransitionButtonConfig } from "$lib/utils/transitions";
import { getOnClick } from "$lib/utils/transitions";
import { fetchBall } from "$lib/constants/fetchStaticData";
import { GITHUB_REPO_URL, POKENATOR_URL } from "$lib/constants/common";

const contents: ContentLink[] = [
  {
    title: "ポケモンずかん",
    ballName: "poke-ball",
    action: "navigate",
    route: "/zukan",
  },
  {
    title: "ポケモンXXくらべ",
    ballName: "great-ball",
    action: "navigate",
    route: "/kurabe",
  },
  {
    title: "ポケモンたかさくらべ 改",
    ballName: "ultra-ball",
    action: "navigate",
    route: "/kurabe-h",
  },
  {
    title: "ポケモンおもさくらべ 改",
    ballName: "heavy-ball",
    action: "navigate",
    route: "/kurabe-w",
  },
  {
    title: "ポケモンタイプじゃんけん",
    ballName: "fast-ball",
    action: "navigate",
    route: "/janken",
  },
  {
    title: "ポケモンしりとり",
    ballName: "heal-ball",
    action: "navigate",
    route: "/shiritori",
  },
  {
    title: "ポケモンだ〜れだ？",
    ballName: "dusk-ball",
    action: "navigate",
    route: "/dareda",
  },
  {
    title: "ポケモンだ〜れだ？ 改",
    ballName: "luxury-ball",
    action: "redirect",
    route: `${POKENATOR_URL}/dareda`,
  },
  {
    title: "ポケモンとりほうだい",
    ballName: "safari-ball",
    action: "navigate",
    route: "/hodai",
  },
  {
    title: "ポケモンえあわせ",
    ballName: "repeat-ball",
    action: "navigate",
    route: "/eawase",
  },
  {
    title: "ポケネイター",
    ballName: "luxury-ball",
    action: "redirect",
    route: POKENATOR_URL,
  },
  {
    title: "しさくひん",
    ballName: "premier-ball",
    action: "navigate",
    route: "/prototype",
  },
  {
    title: "ソースコード",
    ballName: "master-ball",
    action: "redirectNewTab",
    route: GITHUB_REPO_URL,
  },
];

export async function load(): Promise<{ buttonConfigs: TransitionButtonConfig[] }> {
  const ballImages = await Promise.all(contents.map((content) => fetchBall(content.ballName)));
  const buttonConfigs: TransitionButtonConfig[] = contents.map((content, index) => ({
    title: content.title,
    imageUrl: ballImages[index]?.imageUrl ?? "not_found",
    alt: content.ballName,
    onClick: getOnClick(content.action, content.route),
  }));

  return { buttonConfigs };
}
