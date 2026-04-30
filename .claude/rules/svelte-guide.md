---
description: Svelte 5 の開発規約
globs: "apps/skeleton-app/**/*.svelte"
---

# Svelte 5

- **FW**: SvelteKit 2 (Svelte 5) + Skeleton v4
- **スタイル**: TailwindCSS v4
- **バリデーション**: Zod v4
- **ビルド**: Vite 6

## 開発規約

- 4層 Clean Architecture のレイヤー間依存ルールに従う（`docs/architecture/overview.md` を参照）
- ミニゲーム実装の際は、ゲーム型分類に応じた Facade / Store / page.svelte テンプレートを参照し、一貫性のある実装を行う（`docs/architecture/mini-game.md` を参照）
- Runes 記法に統一する（旧 `let`/`$:` 記法は使わない）
  - リアクティブ変数: `let x = $state(0)`
  - 算出値: `const y = $derived(...)`
  - 副作用: `$effect(() => { ... })`
  - Props: `let { a, b } = $props()`（`interface XxxProps` を定義してから使う）
- 同ファイル内の繰り返しUIは `{#snippet}` / `{@render}` を優先検討する
- スタイリングは TailwindCSS ユーティリティクラスのみ。`<style>` ブロックは書かない
  - 動的クラスは文字列リテラルで定義する（テンプレート文字列での動的生成は Tailwind スキャナーに検出されないため NG）
- `$effect` でDOM操作が必要な場合は `tick()` を await してから実行する
- `bind:this` が不安定な場合は `use:` ディレクティブで要素を登録する
- アプリ内ページ遷移は `<a href>` ではなく `navigateTo()` を使う（base path 考慮のため）
  - `import { navigateTo } from "$lib/presentation/utils/navigation"`
