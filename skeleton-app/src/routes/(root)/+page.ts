import { navigateTo } from "$lib/utils/navigation.client";
import { fetchBall } from "$lib/constants/fetchStaticData";
import { GITHUB_REPO_URL } from "$lib/constants/common";

interface Content {
  title: string;
  ballName: string;
  action: "navigate" | "redirect";
  route: string;
}

export interface ContentButtonProps {
  title: string;
  imageUrl: string;
  alt: string;
  onClick: () => void;
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
    title: "ポケモンタイプじゃんけん",
    ballName: "ultra-ball",
    action: "navigate",
    route: "/janken",
  },
  {
    title: "ポケモンしりとり",
    ballName: "safari-ball",
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
    title: "ソースコード",
    ballName: "premier-ball",
    action: "redirect",
    route: GITHUB_REPO_URL,
  },
];

export async function load() {
  const ballImages = await Promise.all(contents.map((content) => fetchBall(content.ballName)));
  const propsArray: ContentButtonProps[] = contents.map((content, index) => ({
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

  return { propsArray };
}
