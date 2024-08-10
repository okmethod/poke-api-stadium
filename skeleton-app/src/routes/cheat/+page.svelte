<script lang="ts">
  import Icon from "@iconify/svelte";
  import makeStaticPokeDict from "$lib/api/makeStaticPokeDict.client";
  import makeStaticTypeDict from "$lib/api/makeStaticTypeDict.client";
  import { TypeName } from "$lib/types/type";
  import { LATEST_POKEMON_ID } from "$lib/constants/staticPokeData";

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
  async function downloadStaticPokeJson() {
    isProcessing = true;
    const pokeIds: number[] = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
    const staticPokeDict = await makeStaticPokeDict(fetch, pokeIds);
    const jsonData = JSON.stringify(staticPokeDict, null, 2);
    try {
      downloadJsonFile(jsonData, staticPokeJsonFileName);
      console.log(`File Write Done: ${staticPokeJsonFileName}`);
    } catch (error) {
      console.error("File Write Failed:", error);
    }
    isProcessing = false;
  }

  let staticTypeJsonFileName = "staticTypeDict.json";
  async function downloadStaticTypeJson() {
    isProcessing = true;
    const typeNames: string[] = Object.values(TypeName) as string[];
    const staticTypeArray = await makeStaticTypeDict(fetch, typeNames);
    const jsonData = JSON.stringify(staticTypeArray, null, 2);
    try {
      downloadJsonFile(jsonData, staticTypeJsonFileName);
      console.log(`File Write Done: ${staticTypeJsonFileName}`);
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
    <!-- 全ポケモン -->
    <div class="ml-4">
      <div class="flex flex-col md:flex-row space-x-3">
        <span class="text-lg">全ポケモンリストJson ダウンロード</span>
        <div class="cInputFormAndMessagePartStyle">
          <input type="text" bind:value={staticPokeJsonFileName} class="border rounded px-4 py-1 h-full" />
          <form on:submit|preventDefault={downloadStaticPokeJson}>
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
        <span class="text-lg">全タイプJson ダウンロード</span>
        <div class="cInputFormAndMessagePartStyle">
          <input type="text" bind:value={staticTypeJsonFileName} class="border rounded px-4 py-1 h-full" />
          <form on:submit|preventDefault={downloadStaticTypeJson}>
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
