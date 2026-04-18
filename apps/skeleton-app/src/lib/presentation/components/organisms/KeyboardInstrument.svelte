<script lang="ts">
  import { SegmentedControl } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import BeepButton from "$lib/presentation/components/buttons/BeepButton.svelte";
  import { WAVE_TYPES, LABEL_TYPES, type LabelType } from "$lib/presentation/sounds/beep";
  import { getNotesWithOctaveShift } from "$lib/presentation/sounds/musicalNote";

  interface Props {
    numOfOctaves?: number;
  }
  let { numOfOctaves = 1 }: Props = $props();

  const waveTypes = WAVE_TYPES;
  const labelTypes = LABEL_TYPES;

  const octaveShifts = $derived(Array.from({ length: numOfOctaves }, (_, i) => i - Math.floor(numOfOctaves / 2)));

  let selectedWaveType: OscillatorType = $state("triangle");
  let selectedLabelType: LabelType = $state("none");

  // 黒鍵のグリッド位置（nullは黒鍵なし）
  const blackKeyPositions = [0, 1, null, 2, 3, 4, null, null];
</script>

{#snippet waveControl()}
  <SegmentedControl
    name="waveType"
    value={selectedWaveType}
    onValueChange={(e) => (selectedWaveType = e.value as OscillatorType)}
  >
    <SegmentedControl.Control class="flex flex-row h-10 space-x-1">
      <SegmentedControl.Indicator />
      {#each waveTypes as waveType, key (key)}
        <SegmentedControl.Item value={waveType}>
          <SegmentedControl.ItemHiddenInput />
          <SegmentedControl.ItemText>
            <Icon icon="mdi:{waveType}-wave" class="size-4" />
          </SegmentedControl.ItemText>
        </SegmentedControl.Item>
      {/each}
    </SegmentedControl.Control>
  </SegmentedControl>
{/snippet}

{#snippet labelControl()}
  <SegmentedControl
    name="labelType"
    value={selectedLabelType}
    onValueChange={(e) => (selectedLabelType = e.value as LabelType)}
  >
    <SegmentedControl.Control class="flex flex-row h-10 space-x-1">
      <SegmentedControl.Indicator />
      {#each labelTypes as labelType, key (key)}
        <SegmentedControl.Item value={labelType}>
          <SegmentedControl.ItemHiddenInput />
          <SegmentedControl.ItemText>
            <span class="text-sm">{labelType}</span>
          </SegmentedControl.ItemText>
        </SegmentedControl.Item>
      {/each}
    </SegmentedControl.Control>
  </SegmentedControl>
{/snippet}

{#snippet oneOctave(octaveShift: number, includeRightC: boolean)}
  {@const musicalNotes = getNotesWithOctaveShift(octaveShift)}
  {@const whiteKeys = includeRightC
    ? musicalNotes.filter((note) => !note.isSharp)
    : musicalNotes.filter((note) => !note.isSharp).slice(0, -1)}
  {@const blackKeys = musicalNotes.filter((note) => note.isSharp)}
  {@const cGridCols = includeRightC ? "grid-cols-8" : "grid-cols-7"}
  <div class="w-80 h-32">
    <div class="w-full h-full grid {cGridCols}">
      {#each whiteKeys as whiteKey, index (index)}
        <div class="relative flex-1">
          <!-- 白鍵 -->
          <BeepButton
            frequency={whiteKey.frequency}
            waveType={selectedWaveType}
            label={selectedLabelType === "ja"
              ? whiteKey.name.ja
              : selectedLabelType === "en"
                ? whiteKey.name.en
                : undefined}
            className="
            flex items-end justify-center
            w-full h-full
            bg-white hover:bg-gray-100 active:bg-gray-200
            text-gray-500
            border border-gray-300
            rounded-sm
            pointer-events-auto
            "
          />

          <!-- 黒鍵 -->
          {#if blackKeyPositions[index] !== null}
            {@const blackKeyIdx = blackKeyPositions[index]!}
            <BeepButton
              frequency={blackKeys[blackKeyIdx].frequency}
              waveType={selectedWaveType}
              className="
              absolute z-10 top-0 right-0 transform translate-x-1/2
              w-3/5 h-3/5
              bg-black hover:bg-gray-900 active:bg-gray-800
              rounded-lg
              pointer-events-auto
              "
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/snippet}

<div class="flex flex-col items-center preset-tonal-primary rounded-lg shadow-lg space-y-4 p-4">
  <div class="flex space-x-4">
    <div class="flex items-center justify-center">
      {@render waveControl()}
    </div>
    <div class="flex items-center justify-center">
      {@render labelControl()}
    </div>
  </div>
  <div class="hidden sm:flex">
    {#each octaveShifts as octaveShift, key (key)}
      {@render oneOctave(octaveShift, false)}
    {/each}
  </div>
  <div class="sm:hidden">
    {@render oneOctave(0, true)}
  </div>
</div>
