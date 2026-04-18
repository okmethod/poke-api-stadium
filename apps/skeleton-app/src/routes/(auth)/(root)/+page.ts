import type { TransitionContent, TransitionButtonConfig } from "$lib/presentation/utils/transitions";
import { generateButtonConfigs } from "$lib/presentation/utils/transitions";
import { GITHUB_REPO_URL } from "$lib/presentation/constants/common";

const contentLinks: TransitionContent[] = [
  {
    label: "Example Route",
    symbolSrc: { type: "icon", key: "mdi:page-next" },
    action: "navigate",
    target: "/example",
  },
  {
    label: "Sound Test",
    symbolSrc: { type: "icon", key: "mdi:music" },
    action: "navigate",
    target: "/sound-test",
  },
  {
    label: "Github Repository",
    symbolSrc: { type: "icon", key: "mdi:source-repository" },
    action: "redirectNewTab",
    target: GITHUB_REPO_URL,
  },
];

export async function load(): Promise<{ buttonConfigs: TransitionButtonConfig[] }> {
  const buttonConfigs = generateButtonConfigs(contentLinks);

  return { buttonConfigs };
}
