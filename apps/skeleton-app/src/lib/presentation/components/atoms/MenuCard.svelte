<script lang="ts">
  interface MenuCardProps {
    label: string;
    description?: string;
    iconSrc: string;
    onclick: () => void;
  }
  let { label, description, iconSrc, onclick }: MenuCardProps = $props();
</script>

<button
  type="button"
  {onclick}
  class="card preset-tonal card-hover flex h-auto w-full {description
    ? 'flex-col items-center gap-3 border px-2 py-3'
    : 'items-center justify-start gap-2 border p-3'}"
>
  <div class={description ? "flex items-center gap-0 sm:gap-2" : "contents"}>
    <img src={iconSrc} alt="" class="object-contain {description ? 'h-10 w-10' : 'h-6 w-6'}" />
    <span class={description ? "text-base font-semibold sm:text-xl" : "text-lg"}>{label}</span>
  </div>
  {#if description}
    <p class="text-xs opacity-70 sm:text-sm">{description}</p>
  {/if}
</button>
