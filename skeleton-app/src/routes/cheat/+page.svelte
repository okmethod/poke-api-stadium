<script lang="ts">
  import Icon from "@iconify/svelte";
  import makeStaticPokeDict from "$lib/api/makeStaticPokeDict.client";
  import makeStaticTypeDict from "$lib/api/makeStaticTypeDict.client";
  import { TypeName } from "$lib/types/type";
  import {
    FIRST_POKE_ID,
    LATEST_POKE_ID,
    FIRST_ADDITIONAL_POKE_ID,
    LATEST_ADDITIONAL_POKE_ID,
  } from "$lib/constants/common";

  let isProcessing = false;

  function downloadJsonFile(jsonData: string, fileName: string) {
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  let staticPokeJsonFileName = "staticPokeDict.json";
  let staticAdditionalPokeJsonFileName = "staticAdditionalPokeDict.json";
  async function downloadStaticPokeJson(fileName: string, firstPokeId: number, latestPokeId: number) {
    isProcessing = true;
    const idsLength = latestPokeId - firstPokeId + 1;
    const pokeIds: number[] = Array.from({ length: idsLength }, (_, i) => firstPokeId + i);
    const staticPokeDict = await makeStaticPokeDict(fetch, pokeIds);
    const jsonData = JSON.stringify(staticPokeDict, null, 2);
    try {
      downloadJsonFile(jsonData, fileName);
      console.log(`File Write Done: ${fileName}`);
    } catch (error) {
      console.error("File Write Failed:", error);
    }
    isProcessing = false;
  }

  let staticTypeJsonFileName = "staticTypeDict.json";
  async function downloadStaticTypeJson(fileName: string) {
    isProcessing = true;
    const typeNames: string[] = Object.values(TypeName) as string[];
    const staticTypeArray = await makeStaticTypeDict(fetch, typeNames);
    const jsonData = JSON.stringify(staticTypeArray, null, 2);
    try {
      downloadJsonFile(jsonData, fileName);
      console.log(`File Write Done: ${fileName}`);
    } catch (error) {
      console.error("File Write Failed:", error);
    }
    isProcessing = false;
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">うらわざ</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !min-w-[300px] !max-w-[600px]">
    <!-- 全ポケモン (通常フォルム) -->
    <div class="ml-4">
      <div class="flex flex-col md:flex-row space-x-3">
        <span class="text-lg">全ポケモン(通常フォルム) Json DL</span>
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="text"
            id="dlPokeJson"
            bind:value={staticPokeJsonFileName}
            class="border rounded px-4 py-1 h-full"
          />
          <form
            on:submit|preventDefault={() =>
              downloadStaticPokeJson(staticPokeJsonFileName, FIRST_POKE_ID, LATEST_POKE_ID)}
          >
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:pokeball" class="cIconStyle" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- 全ポケモン (別フォルム) -->
    <div class="ml-4">
      <div class="flex flex-col md:flex-row space-x-3">
        <span class="text-lg">全ポケモン(別フォルム) Json DL</span>
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="text"
            id="dlAddPokeJson"
            bind:value={staticPokeJsonFileName}
            class="border rounded px-4 py-1 h-full"
          />
          <form
            on:submit|preventDefault={() =>
              downloadStaticPokeJson(
                staticAdditionalPokeJsonFileName,
                FIRST_ADDITIONAL_POKE_ID,
                LATEST_ADDITIONAL_POKE_ID,
              )}
          >
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:pokeball" class="cIconStyle" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- 全タイプ -->
    <div class="ml-4">
      <div class="flex flex-col md:flex-row space-x-3">
        <span class="text-lg">全タイプJson DL</span>
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="text"
            id="dlTypeJson"
            bind:value={staticTypeJsonFileName}
            class="border rounded px-4 py-1 h-full"
          />
          <form on:submit|preventDefault={() => downloadStaticTypeJson(staticTypeJsonFileName)}>
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:pokeball" class="cIconStyle" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
