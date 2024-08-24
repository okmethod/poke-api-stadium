import type { LoadEvent } from "@sveltejs/kit";
import { navigateTo } from "$lib/utils/navigation.client";
import { pickRandomNumbers } from "$lib/utils/collections";
import { fetchStaticAddPokeData, fetchBall } from "$lib/constants/fetchStaticData";
import { GITHUB_REPO_URL, POKENATOR_URL } from "$lib/constants/common";

type Action = "navigate" | "redirect" | "redirectNewTab";

interface Content {
  title: string;
  ballName: string;
  action: Action;
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
    title: "ポケモンおもさくらべ改",
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
    title: "ソースコード",
    ballName: "premier-ball",
    action: "redirectNewTab",
    route: GITHUB_REPO_URL,
  },
];

// prettier-ignore
const symbolPokeIds = [
  10080, 10081, 10082, 10083, 10084, 10085,
  10094, 10095, 10096, 10097, 10098, 10099,
  10148, 10158, 10160,
];

export interface ButtonConfig {
  title: string;
  imageUrl: string;
  alt: string;
  onClick: () => void;
}

export async function load({ fetch }: LoadEvent): Promise<{ buttonConfigs: ButtonConfig[]; symbolUrl: string }> {
  const ballImages = await Promise.all(contents.map((content) => fetchBall(content.ballName)));
  const buttonConfigs: ButtonConfig[] = contents.map((content, index) => ({
    title: content.title,
    imageUrl: ballImages[index]?.imageUrl ?? "not_found",
    alt: content.ballName,
    onClick: _getOnClick(content.action, content.route),
  }));

  function _getOnClick(action: Action, route: string): () => void {
    const actions: { [key in Action]: () => void } = {
      navigate: () => navigateTo(route),
      redirect: () => {
        window.location.href = route;
      },
      redirectNewTab: () => window.open(route, "_blank"),
    };
    return actions[action] || (() => {});
  }

  const symbolId = pickRandomNumbers(symbolPokeIds, 1)[0];
  const symbolUrl = (await fetchStaticAddPokeData(fetch, symbolId.toString())).gifUrl ?? "not_found";

  return { buttonConfigs, symbolUrl };
}
