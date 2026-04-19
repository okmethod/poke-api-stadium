<script lang="ts">
  import { Switch } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import { themeLabels, getTheme, setTheme, applyTheme } from "$lib/presentation/stores/themeStore";

  let currentTheme = $state(getTheme());

  function handleThemeChange(selectedTheme: string) {
    setTheme({ name: selectedTheme, dark: currentTheme.dark });
    currentTheme = getTheme();
    applyTheme();
  }

  function toggleDarkMode() {
    setTheme({ name: currentTheme.name, dark: !currentTheme.dark });
    currentTheme = getTheme();
    applyTheme();
  }
</script>

<div class="space-y-3">
  <div class="flex items-center justify-between">
    <span class="text-sm opacity-70">ダークモード</span>
    <Switch name="toggle-dark-mode" checked={currentTheme.dark} onCheckedChange={() => toggleDarkMode()}>
      <Switch.Control class="bg-surface-200 h-8 w-12">
        <Switch.Thumb>
          <Switch.Context>
            {#snippet children(switch_)}
              {#if switch_().checked}
                <Icon icon="mdi:weather-night" class="size-6" />
              {:else}
                <Icon icon="mdi:weather-sunny" class="size-6" />
              {/if}
            {/snippet}
          </Switch.Context>
        </Switch.Thumb>
      </Switch.Control>
      <Switch.HiddenInput />
    </Switch>
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
