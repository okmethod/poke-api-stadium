<script lang="ts">
  // 難易度定義（Tailwind スキャン対象のためリテラルで定義）
  const DIFFICULTIES = {
    easy: { label: "かんたん", activeClass: "preset-filled-success-500" },
    normal: { label: "ふつう", activeClass: "preset-filled-warning-500" },
    hard: { label: "むずかしい", activeClass: "preset-filled-error-500" },
  } as const;

  type Difficulty = keyof typeof DIFFICULTIES;

  interface DifficultyButtonProps {
    value: Difficulty;
    levels: readonly Difficulty[];
    onchange: (value: Difficulty) => void;
    disabled?: boolean;
  }

  let { value, levels, onchange, disabled = false }: DifficultyButtonProps = $props();

  function handleClick(): void {
    const idx = levels.indexOf(value);
    const next = levels[(idx + 1) % levels.length]!;
    onchange(next);
  }
</script>

<button type="button" class="btn btn-sm w-20 {DIFFICULTIES[value].activeClass}" {disabled} onclick={handleClick}>
  {DIFFICULTIES[value].label}
</button>
