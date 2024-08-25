<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { makeFunction, DownloadConfig } from "./+page";
  import { downloadFile } from "$lib/utils/download.client";

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
    const data = await makeFunction(window.fetch, keys);

    const extension = getFileExtension(fileName);
    if (extension === "json") {
      const jsonData = JSON.stringify(data, null, 2);
      await downloadFile(jsonData, fileName, "application/json", useCompression);
    } else if (extension === "csv") {
      const csvData = convertDictToCsv(data);
      console.log(csvData);

      await downloadFile(csvData, fileName, "application/json", useCompression);
    } else {
      console.log(`Unsupported file extension: ${extension}`);
    }
    isProcessing = false;
  }

  function getFileExtension(fileName: string): string {
    const dotIndex = fileName.lastIndexOf(".");
    if (dotIndex === -1) {
      return ""; // 拡張子がない場合は空文字を返す
    }
    return fileName.substring(dotIndex + 1);
  }

  function convertDictToCsv<T>(data: Record<string, T>[]): string {
    const values = Object.values(data);
    const keys = Object.keys(data);
    if (keys.length === 0) return "";

    const headerKeys = Object.keys(values[0]);
    const header = ["No", ...headerKeys].join(",") + "\n";
    const body = keys
      .map((key, index) =>
        [key, ...headerKeys.map((k) => (values[index][k] !== null ? values[index][k] : "null"))].join(","),
      )
      .join("\n");

    return header + body;
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
            <span class="cSpanTextStyle">{config.label}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
