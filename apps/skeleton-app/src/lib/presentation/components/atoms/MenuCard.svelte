<script lang="ts">
  interface MenuCardProps {
    label: string;
    description?: string;
    iconSrc: string;
    onclick: () => void;
  }
  let { label, description, iconSrc, onclick }: MenuCardProps = $props();
</script>

{#if description}
  <button
    type="button"
    {onclick}
    class="card preset-tonal card-hover flex h-auto w-full flex-col items-center gap-3 border px-4 py-6"
  >
    <div class="flex items-center gap-0 sm:gap-2">
      <img src={iconSrc} alt="" class="h-10 w-10 object-contain" />
      <span class="text-xl font-semibold">{label}</span>
    </div>
    <p class="text-xs opacity-70 sm:text-sm">{description}</p>
  </button>
{:else}
  <button
    type="button"
    {onclick}
    class="card preset-tonal card-hover flex h-auto w-full items-center justify-start gap-2 border p-3"
  >
    <img src={iconSrc} alt="" class="h-6 w-6 object-contain" />
    <span class="text-lg">{label}</span>
  </button>
{/if}
