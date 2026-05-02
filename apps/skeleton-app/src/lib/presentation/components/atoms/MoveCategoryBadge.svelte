<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { MoveCategory } from "$lib/domain/models/PokeMove";
  import { MOVE_CATEGORY_JA } from "$lib/domain/models/PokeMove";

  const BADGE_CONFIG: Record<MoveCategory, { icon: string; bg: string }> = {
    physical: { icon: "mdi:octagram-outline", bg: "#C92112" },
    special: { icon: "mdi:bullseye", bg: "#4F5FA8" },
    status: { icon: "mdi:rotate-3d-variant", bg: "#8C8C8C" },
  };

  interface Props {
    category: MoveCategory;
  }
  let { category }: Props = $props();
</script>

<span
  class="inline-flex h-5 items-center gap-0.5 rounded px-1.5 py-0.5 text-xs text-white"
  style="background-color: {BADGE_CONFIG[category].bg};"
>
  <Icon icon={BADGE_CONFIG[category].icon} class="size-3" />
  {MOVE_CATEGORY_JA[category]}
</span>
