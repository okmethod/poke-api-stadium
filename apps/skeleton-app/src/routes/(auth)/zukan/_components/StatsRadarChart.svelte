<script lang="ts">
  import type { PokeStats } from "$lib/domain/models/PokeData";
  import { pokeStatJaName } from "$lib/domain/models/PokeData";

  interface StatsRadarChartProps {
    stats: PokeStats | null;
  }
  let { stats }: StatsRadarChartProps = $props();

  const SIZE = 200;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const MAX_R = SIZE / 2 - 28;
  // レーダーチャート用の表示順（6角形を時計回りに均等配置）
  const STAT_KEYS: (keyof PokeStats)[] = ["hp", "attack", "defense", "speed", "spDef", "spAtk"];
  const STAT_LABELS = STAT_KEYS.map((k) => pokeStatJaName(k));
  const ANGLES = STAT_KEYS.map((_, i) => (i / STAT_KEYS.length) * 2 * Math.PI - Math.PI / 2);
  const MAX_STAT = 200;

  const statsArr = $derived(stats ? STAT_KEYS.map((k) => stats[k]) : [0, 0, 0, 0, 0, 0]);

  const dataPoints = $derived(
    statsArr.map((v, i) => {
      const r = MAX_R * Math.min(v / MAX_STAT, 1);
      return { x: CX + r * Math.cos(ANGLES[i]!), y: CY + r * Math.sin(ANGLES[i]!) };
    }),
  );

  const polygonPoints = $derived(dataPoints.map((p) => `${p.x},${p.y}`).join(" "));

  function gridPolygon(ratio: number): string {
    return ANGLES.map((a) => `${CX + MAX_R * ratio * Math.cos(a)},${CY + MAX_R * ratio * Math.sin(a)}`).join(" ");
  }

  const labelPos = ANGLES.map((a, i) => ({
    label: STAT_LABELS[i],
    x: CX + (MAX_R + 20) * Math.cos(a),
    y: CY + (MAX_R + 20) * Math.sin(a),
  }));
</script>

<svg width={SIZE} height={SIZE} viewBox="0 0 {SIZE} {SIZE}">
  <!-- グリッド -->
  {#each [0.25, 0.5, 0.75, 1.0] as ratio (ratio)}
    <polygon points={gridPolygon(ratio)} fill="none" stroke="#ccc" stroke-width="1" />
  {/each}
  <!-- 軸線 -->
  {#each ANGLES as angle, i (i)}
    <line
      x1={CX}
      y1={CY}
      x2={CX + MAX_R * Math.cos(angle)}
      y2={CY + MAX_R * Math.sin(angle)}
      stroke="#ccc"
      stroke-width="1"
    />
  {/each}
  <!-- データポリゴン -->
  <polygon points={polygonPoints} fill="rgba(255,99,132,0.2)" stroke="rgb(255,99,132)" stroke-width="1.5" />
  <!-- データ頂点 -->
  {#each dataPoints as { x, y }, i (i)}
    <circle cx={x} cy={y} r="3" fill="rgb(255,99,132)" />
  {/each}
  <!-- ラベル -->
  {#each labelPos as { label, x, y } (label)}
    <text {x} {y} text-anchor="middle" dominant-baseline="middle" font-size="9" fill="currentColor">
      {label}
    </text>
  {/each}
</svg>
