<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { getHealthRepository } from "$lib/infrastructure/adapters/FastApiHealthRepository";

  let { children } = $props();

  let authorized = $state(false);

  async function checkAuth(fetch: typeof window.fetch): Promise<boolean> {
    try {
      const health = await getHealthRepository().checkHealth(fetch);
      console.log("Internal API health check:", health.message);
    } catch (error) {
      console.error("Internal API health check failed:", error);
      return true;
    }
    return true;
  }

  onMount(async () => {
    if (browser) {
      authorized = await checkAuth(window.fetch);
    }
    if (!authorized) {
      // 未認証の場合の処理をここに書く
      // void goto("/login");
    }
  });
</script>

{#if authorized}
  {@render children()}
{:else}
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="font-mono text-3xl">Now Loading...</div>
  </div>
{/if}
