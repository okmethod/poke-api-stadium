<script lang="ts">
  import Icon from "@iconify/svelte";

  interface SpawnButtonProps {
    onclick: () => void | Promise<void>;
    isLoading: boolean;
    disabled?: boolean;
    label?: string;
    icon?: string;
    title?: string;
  }
  let {
    onclick,
    isLoading,
    disabled = false,
    label = "よびだす",
    icon = "mdi:pokeball",
    title = "ポケモンをよびだす",
  }: SpawnButtonProps = $props();
</script>

<button type="button" class="btn preset-tonal btn-sm" {onclick} disabled={isLoading || disabled} {title}>
  {#if isLoading}
    <Icon icon="mdi:loading" class="size-5 animate-spin" />
  {:else}
    <Icon {icon} class="size-5" />
  {/if}
  {label}
</button>
