import type { ContentLink, TransitionButtonConfig } from "$lib/utils/transitions";
import { getOnClick } from "$lib/utils/transitions";
import { fetchBall } from "$lib/constants/fetchStaticData";
import { MATTER_PROTOTYPE_URL } from "$lib/constants/common";

const contents: ContentLink[] = [
  {
    title: "2D物理エンジン",
    ballName: "premier-ball",
    action: "redirectNewTab",
    route: MATTER_PROTOTYPE_URL,
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
