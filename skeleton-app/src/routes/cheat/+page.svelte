<script lang="ts">
  import Icon from "@iconify/svelte";
  import makeStaticPokeDict from "$lib/api/makeStaticPokeDict.client";
  import makeStaticTypeDict from "$lib/api/makeStaticTypeDict.client";
  import { TypeName } from "$lib/types/type";
  import { downloadJsonFile } from "$lib/utils/download.client";
  import {
    FIRST_POKE_ID,
    LATEST_POKE_ID,
    FIRST_ADDITIONAL_POKE_ID,
    LATEST_ADDITIONAL_POKE_ID,
  } from "$lib/constants/common";

  let isProcessing = false;

  async function handleDownload(
    fetchFunction: Function,
    dataFunction: Function,
    fileName: string,
    useCompression: boolean,
    ...args: any[]
  ) {
    isProcessing = true;
    try {
      const data = await dataFunction(fetchFunction, ...args);
      const jsonData = JSON.stringify(data, null, 2);
      await downloadJsonFile(jsonData, fileName, useCompression);
      console.log(`File Write Done: ${fileName}`);
    } catch (error) {
      console.error("File Write Failed:", error);
    }
    isProcessing = false;
  }

  let staticPokeJsonFileName = "staticPokeDict.json";
  let staticAdditionalPokeJsonFileName = "staticAdditionalPokeDict.json";
  async function downloadStaticPokeJson(
    fileName: string,
    useCompression: boolean,
    firstPokeId: number,
    latestPokeId: number,
  ) {
    const idsLength = latestPokeId - firstPokeId + 1;
    const pokeIds: number[] = Array.from({ length: idsLength }, (_, i) => firstPokeId + i);
    await handleDownload(fetch, makeStaticPokeDict, fileName, useCompression, pokeIds);
  }

  let staticTypeJsonFileName = "staticTypeDict.json";
  async function downloadStaticTypeJson(fileName: string, useCompression: boolean) {
    const typeNames: string[] = Object.values(TypeName) as string[];
    await handleDownload(fetch, makeStaticTypeDict, fileName, useCompression, typeNames);
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
    <div class="m-4">
      <div class="flex flex-col md:flex-row space-x-3">
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="text"
            id="dlPokeJson"
            bind:value={staticPokeJsonFileName}
            class="border rounded px-4 py-1 h-full"
          />
          <form
            on:submit|preventDefault={() =>
              downloadStaticPokeJson(staticPokeJsonFileName, false, FIRST_POKE_ID, LATEST_POKE_ID)}
          >
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:download-box-outline" class="cIconStyle" />
              </div>
            </button>
          </form>
          <form
            on:submit|preventDefault={() =>
              downloadStaticPokeJson(staticPokeJsonFileName, true, FIRST_POKE_ID, LATEST_POKE_ID)}
          >
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:zip-box-outline" class="cIconStyle" />
              </div>
            </button>
          </form>
          <span class="text-lg">全ポケモン(通常) Json</span>
        </div>
      </div>
    </div>

    <!-- 全ポケモン (別フォルム) -->
    <div class="m-4">
      <div class="flex flex-col md:flex-row space-x-3">
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="text"
            id="dlAddPokeJson"
            bind:value={staticAdditionalPokeJsonFileName}
            class="border rounded px-4 py-1 h-full"
          />
          <form
            on:submit|preventDefault={() =>
              downloadStaticPokeJson(
                staticAdditionalPokeJsonFileName,
                false,
                FIRST_ADDITIONAL_POKE_ID,
                LATEST_ADDITIONAL_POKE_ID,
              )}
          >
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:download-box-outline" class="cIconStyle" />
              </div>
            </button>
          </form>
          <form
            on:submit|preventDefault={() =>
              downloadStaticPokeJson(
                staticAdditionalPokeJsonFileName,
                true,
                FIRST_ADDITIONAL_POKE_ID,
                LATEST_ADDITIONAL_POKE_ID,
              )}
          >
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:download-box-outline" class="cIconStyle" />
              </div>
            </button>
          </form>
          <span class="text-lg">全ポケモン(別ver) Json</span>
        </div>
      </div>
    </div>

    <!-- 全タイプ -->
    <div class="m-4">
      <div class="flex flex-col md:flex-row space-x-3">
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="text"
            id="dlTypeJson"
            bind:value={staticTypeJsonFileName}
            class="border rounded px-4 py-1 h-full"
          />
          <form on:submit|preventDefault={() => downloadStaticTypeJson(staticTypeJsonFileName, false)}>
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:download-box-outline" class="cIconStyle" />
              </div>
            </button>
          </form>
          <form on:submit|preventDefault={() => downloadStaticTypeJson(staticTypeJsonFileName, true)}>
            <button type="submit" disabled={isProcessing} class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}">
              <div class="cIconDivStyle">
                <Icon icon="mdi:zip-box-outline" class="cIconStyle" />
              </div>
            </button>
          </form>
          <span class="text-lg">全タイプJson</span>
        </div>
      </div>
    </div>
  </div>
</div>
