import { navigateTo } from "$lib/utils/navigation.client";
import { fetchBall } from "$lib/constants/fetchStaticData";
import { GITHUB_REPO_URL } from "$lib/constants/common";

interface Content {
  title: string;
  ballName: string;
  action: "navigate" | "redirect";
  route: string;
}

const contents: Content[] = [
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
    title: "ポケモンたかさくらべ改",
    ballName: "ultra-ball",
    action: "navigate",
    route: "/kurabe-h",
  },
  {
    title: "ポケモンタイプじゃんけん",
    ballName: "fast-ball",
    action: "navigate",
    route: "/janken",
  },
  {
    title: "ポケモンしりとり",
    ballName: "repeat-ball",
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
    title: "ポケモンとりほうだい",
    ballName: "safari-ball",
    action: "navigate",
    route: "/hodai",
  },
  {
    title: "ソースコード",
    ballName: "premier-ball",
    action: "redirect",
    route: GITHUB_REPO_URL,
  },
];

export interface ButtonConfig {
  title: string;
  imageUrl: string;
  alt: string;
  onClick: () => void;
}

export async function load(): Promise<{ buttonConfigs: ButtonConfig[] }> {
  const ballImages = await Promise.all(contents.map((content) => fetchBall(content.ballName)));
  const buttonConfigs: ButtonConfig[] = contents.map((content, index) => ({
    title: content.title,
    imageUrl: ballImages[index]?.imageUrl ?? "not_found",
    alt: content.ballName,
    onClick: _getOnClick(content.action, content.route),
  }));

  function _getOnClick(action: string, route: string): () => void {
    const actions: { [key: string]: () => void } = {
      navigate: () => navigateTo(route),
      redirect: () => window.open(route, "_blank"),
    };
    return actions[action] || (() => {});
  }

  return { buttonConfigs };
}
