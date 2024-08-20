import type { LoadEvent } from "@sveltejs/kit";
import type { PokeItem } from "../+layout";

export async function load({ parent }: LoadEvent): Promise<{ pokeItems: PokeItem[] }> {
  const parentData = await parent();
  return { pokeItems: parentData.pokeItems };
}
