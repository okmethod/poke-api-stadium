<script lang="ts">
  import { SegmentedControl } from "@skeletonlabs/skeleton-svelte";
  import { themeLabels, getTheme, setTheme, applyTheme } from "$lib/presentation/stores/themeStore";

  let currentTheme = $state(getTheme());

  function handleThemeChange(selectedTheme: string) {
    setTheme({ name: selectedTheme, dark: currentTheme.dark });
    currentTheme = getTheme();
    applyTheme();
  }
</script>

<div class="space-y-3">
  <div class="flex items-center justify-end">
    <SegmentedControl
      name="toggle-dark-mode"
      value={String(currentTheme.dark)}
      onValueChange={(e) => {
        const isDark = e.value === "true";
        setTheme({ name: currentTheme.name, dark: isDark });
        currentTheme = getTheme();
        applyTheme();
      }}
    >
      <SegmentedControl.Control class="flex flex-row">
        <SegmentedControl.Indicator />
        <SegmentedControl.Item value="false">
          <SegmentedControl.ItemHiddenInput />
          <SegmentedControl.ItemText>ライトモード</SegmentedControl.ItemText>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="true">
          <SegmentedControl.ItemHiddenInput />
          <SegmentedControl.ItemText>ダークモード</SegmentedControl.ItemText>
        </SegmentedControl.Item>
      </SegmentedControl.Control>
    </SegmentedControl>
  </div>
  <ul class="grid grid-cols-4 gap-2">
    {#each themeLabels as theme, key (key)}
      <li>
        <button
          type="button"
          onclick={() => handleThemeChange(theme.name)}
          class={`btn flex w-full items-center gap-1 ${
            currentTheme.name === theme.name
              ? "preset-outlined-primary-500"
              : "preset-filled-primary-500 dark:preset-tonal-primary"
          }`}
          aria-pressed={currentTheme.name === theme.name}
        >
          <span>{theme.emoji}</span>
          <span class="hidden flex-1 text-left text-sm sm:inline">{theme.name}</span>
        </button>
      </li>
    {/each}
  </ul>
</div>
