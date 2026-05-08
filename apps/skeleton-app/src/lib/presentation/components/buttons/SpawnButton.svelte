<script lang="ts">
  import Icon from "@iconify/svelte";

  interface SpawnButtonProps {
    onclick: () => void | Promise<void>;
    isLoading: boolean;
    disabled?: boolean;
    icon?: string;
    title?: string;
    /** true のとき「もう一度」、false のとき「はじめる」 */
    started?: boolean;
  }
  let { onclick, isLoading, disabled = false, started = false, icon, title }: SpawnButtonProps = $props();

  const label = $derived(started ? "もう一度" : "はじめる");
  const resolvedIcon = $derived(icon ?? (started ? "mdi:restart" : "mdi:pokeball"));
  const resolvedTitle = $derived(title ?? (started ? "もう一度あそぶ" : "ゲームをはじめる"));
</script>

<button type="button" class="btn preset-tonal btn-sm" {onclick} disabled={isLoading || disabled} title={resolvedTitle}>
  {#if isLoading}
    <Icon icon="mdi:loading" class="size-5 animate-spin" />
  {:else}
    <Icon icon={resolvedIcon} class="size-5" />
  {/if}
  {label}
</button>
