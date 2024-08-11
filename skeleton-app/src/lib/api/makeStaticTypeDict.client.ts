import { getType } from "$lib/api/getType.client";
import type { TypeData } from "$lib/types/type";
import { convertToTypeData } from "$lib/types/type";

async function makeStaticTypeDict(
  fetchFunction: typeof window.fetch,
  typeNames: string[],
): Promise<{ [name: string]: TypeData }> {
  const staticTypeDict: { [name: string]: TypeData } = {};

  const promises = typeNames.map(async (typeName) => {
    const typeJson = await getType(fetchFunction, typeName.toString());
    const typeData = convertToTypeData(typeJson);
    staticTypeDict[typeName] = typeData;
  });

  await Promise.all(promises);
  return staticTypeDict;
}

export default makeStaticTypeDict;
