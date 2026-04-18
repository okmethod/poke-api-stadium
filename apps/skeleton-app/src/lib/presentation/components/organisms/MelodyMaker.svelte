<script lang="ts">
  import { SegmentedControl } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import { WAVE_TYPES } from "$lib/presentation/sounds/beep";
  import { sampleMelody, type MelodyNote } from "$lib/presentation/sounds/melody";
  import MelodyButton from "$lib/presentation/components/buttons/MelodyButton.svelte";

  let selectedWaveType: OscillatorType = "square";
  let editableMelody: (MelodyNote | null)[] = [...sampleMelody.melodyNotes];

  const waveTypes = WAVE_TYPES;

  // 音符または休符を更新する関数
  function updateNote(index: number, field: "name" | "octave" | "duration", value: string | number) {
    editableMelody = editableMelody.map((note, i) => (i === index && note ? { ...note, [field]: value } : note));
  }

  // 休符と音符を切り替える関数
  function toggleRest(index: number) {
    editableMelody = editableMelody.map((note, i) =>
      i === index ? (note ? null : { name: "C", octave: 4, duration: 1 }) : note,
    );
  }
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

{#snippet melodyList()}
  <ul class="w-full space-y-2">
    {#each editableMelody as note, index (index)}
      <li class="grid grid-cols-8 place-items-center gap-2 p-1 h-12 bg-white dark:bg-gray-700 rounded shadow">
        <span class="col-span-1">
          {index + 1}.
        </span>

        <!-- 休符の切り替え -->
        <div class="col-span-1">
          <button class="p-1 w-full bg-gray-300 dark:bg-gray-600 rounded" onclick={() => toggleRest(index)}>
            <Icon icon="mdi:{note ? 'music-note-quarter' : 'music-rest-quarter'}" />
          </button>
        </div>

        <div class="col-span-6 flex items-center space-x-2">
          {#if note}
            <!-- 音名 -->
            <input
              type="text"
              class="p-1 border rounded dark:bg-gray-600 dark:text-gray-200"
              bind:value={note.name}
              oninput={(e: Event) => updateNote(index, "name", (e.target as HTMLInputElement).value)}
            />

            <!-- オクターブ -->
            <input
              type="number"
              class="p-1 border rounded dark:bg-gray-600 dark:text-gray-200"
              bind:value={note.octave}
              oninput={(e: Event) => updateNote(index, "octave", parseInt((e.target as HTMLInputElement).value))}
            />

            <!-- 拍数 -->
            <input
              type="number"
              class="p-1 border rounded dark:bg-gray-600 dark:text-gray-200"
              bind:value={note.duration}
              oninput={(e: Event) => updateNote(index, "duration", parseFloat((e.target as HTMLInputElement).value))}
            />
          {:else}
            <!-- 休符の場合 -->
            <span class="text-gray-600 dark:text-gray-400">-</span>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
{/snippet}

<div class="flex flex-col items-center preset-tonal-primary rounded-lg shadow-lg space-y-4 p-4">
  <div class="flex items-center justify-center">
    {@render waveControl()}
  </div>

  {@render melodyList()}

  <MelodyButton
    waveType={selectedWaveType}
    melody={editableMelody}
    tempoBpm={sampleMelody.defaultTempoBpm}
    iconName="mdi:music"
    label="Play"
    className="btn preset-filled"
  />
</div>
