<script lang="ts">
  import { isImageConfig, isIconConfig, type TransitionButtonConfig } from "$lib/presentation/utils/transitions";
  import type { PokeData } from "$lib/domain/models/poke";
  import Icon from "@iconify/svelte";

  interface PageProps {
    data: {
      buttonConfigs: Array<TransitionButtonConfig>;
      bulbasaur: PokeData;
    };
  }

  let { data }: PageProps = $props();
</script>

<div class="flex flex-col items-center justify-center p-4">
  <h2 class="h3 sm:h2">Welcome to My Static Site !</h2>

  <!-- PokeData 動作確認 -->
  <div class="card p-4 my-4 text-sm space-y-1">
    <p>#{data.bulbasaur.id} {data.bulbasaur.jaName} / {data.bulbasaur.enName}</p>
    <p>タイプ: {data.bulbasaur.type1}{data.bulbasaur.type2 ? ` / ${data.bulbasaur.type2}` : ""}</p>
    <p>世代: 第{data.bulbasaur.generation}世代</p>
    <p>HP:{data.bulbasaur.stats.hp} こうげき:{data.bulbasaur.stats.attack} ぼうぎょ:{data.bulbasaur.stats.defense}</p>
    <img src={data.bulbasaur.imageUrl} alt={data.bulbasaur.enName} class="w-24 h-24" />
  </div>

  <div class="space-y-4 my-4">
    {#each data.buttonConfigs as config, key (key)}
      <div>
        <button
          onclick={(e) => {
            e.preventDefault();
            config.onClick();
          }}
          class="flex items-center space-x-2"
        >
          <div class="w-6 h-6">
            {#if config.symbol === null}
              <!-- no symbol -->
            {:else if isImageConfig(config.symbol)}
              <img src={config.symbol.src} alt={config.symbol.alt} class="w-full h-full" />
            {:else if isIconConfig(config.symbol)}
              <Icon icon={config.symbol.icon} class="w-full h-full" />
            {/if}
          </div>
          <span class="hover:underline text-lg md:text-2xl">{config.label}</span>
        </button>
      </div>
    {/each}
  </div>
</div>
