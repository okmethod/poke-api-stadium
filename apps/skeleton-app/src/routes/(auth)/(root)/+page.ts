import type { TransitionContent, TransitionButtonConfig } from "$lib/presentation/utils/transitions";
import { generateButtonConfigs } from "$lib/presentation/utils/transitions";
import { GITHUB_REPO_URL } from "$lib/presentation/constants/common";
import type { PokeData } from "$lib/domain/models/poke";
import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
import type { LoadEvent } from "@sveltejs/kit";

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

export async function load({
  fetch,
}: LoadEvent): Promise<{ buttonConfigs: TransitionButtonConfig[]; bulbasaur: PokeData }> {
  const buttonConfigs = generateButtonConfigs(contentLinks);
  const bulbasaur = await getPokeRepository().getPokemon(fetch, 1);

  return { buttonConfigs, bulbasaur };
}
