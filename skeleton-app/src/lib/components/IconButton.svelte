<script lang="ts">
  import Icon from "@iconify/svelte";

  export let icon: string;
  export let label: string;
  export let cButton: string = "";
  export let onClick: () => void;
</script>

<button type="button" class="btn variant-filled {cButton}" on:click={onClick}>
  <div class="w-5 h-5">
    <Icon {icon} class="w-full h-full" />
  </div>
  <span>{label}</span>
</button>
