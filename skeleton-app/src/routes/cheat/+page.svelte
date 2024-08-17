<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { makeFunction, DownloadConfig } from "./+page";
  import { downloadJsonFile } from "$lib/utils/download.client";

  export let data: {
    downloadConfigs: DownloadConfig[];
  };

  let isProcessing = false;
  async function handleDownload(
    makeFunction: makeFunction,
    keys: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    fileName: string,
    useCompression: boolean,
  ): Promise<void> {
    isProcessing = true;
    try {
      const data = await makeFunction(window.fetch, keys);
      const jsonData = JSON.stringify(data, null, 2);
      await downloadJsonFile(jsonData, fileName, useCompression);
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
    <!-- 各種ダウンロードボタン -->
    {#each data.downloadConfigs as config}
      <div class="m-4">
        <div class="flex flex-col md:flex-row space-x-3">
          <div class="cInputFormAndMessagePartStyle">
            <input type="text" id={config.id} bind:value={config.fileName} class="border rounded px-4 py-1 h-full" />
            <form
              on:submit|preventDefault={() => handleDownload(config.makeFunction, config.keys, config.fileName, false)}
            >
              <button
                type="submit"
                disabled={isProcessing}
                class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}"
              >
                <div class="cIconDivStyle">
                  <Icon icon="mdi:download-box-outline" class="cIconStyle" />
                </div>
              </button>
            </form>
            <form
              on:submit|preventDefault={() => handleDownload(config.makeFunction, config.keys, config.fileName, true)}
            >
              <button
                type="submit"
                disabled={isProcessing}
                class="cIconButtonStyle {isProcessing ? '!bg-gray-500' : ''}"
              >
                <div class="cIconDivStyle">
                  <Icon icon="mdi:zip-box-outline" class="cIconStyle" />
                </div>
              </button>
            </form>
            <span class="text-lg">{config.label}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
