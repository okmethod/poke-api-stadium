# ミニゲーム設計ガイド

新しいミニゲームを追加するときの設計方針・実装テンプレート・チェックリストをまとめる。

---

## ゲーム型の分類

ミニゲームは、**Facade が依存するインフラ層** によって次の3タイプに分類される。
そのため、分類の軸はコンストラクタ引数で判別できる。

| タイプ          | 特徴                                                                  | 例                                          |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| **Standard型**  | PokeAPI でポケモンを取得し、クイズ・ゲームロジックを実行する          | SilhouetteQuiz, WordChain, StatsSortingQuiz |
| **2dPhysics型** | 物理エンジンを追加し、`initialize/dispose` のライフサイクル管理が必要 | HeightComparison, PairCollisionDetection    |
| **LLM型**       | LLM リポジトリを追加し、SSE ストリーミングでチャットを行う            | InterrogationQuiz                           |

---

## ファイル構成

```
lib/application/usecases/XxxYyy/
├── facade.ts    # ユースケース実装（Facade パターン）
├── store.ts     # ゲーム状態ストア（プレゼン層からも参照・更新は Facade のみ）
└── index.ts     # facade / store の再エクスポート

routes/(auth)/xxx-yyy/
├── +page.svelte          # ページ（Controller）
├── +page.ts              # ページデータ（必要な場合のみ）
└── _components/          # ページ固有コンポーネント（必要な場合のみ）
    └── XxxComponent.svelte
```

---

## 設計ポリシー

### 命名のポイント

ページ名・表示名・クラス名は必ずしも一致しない。以下の方針で別途適切な命名を検討する。

- ページ名: URLに使用するための命名。簡潔さが重要。
- 表示名: ユーザー向けの命名。キャッチーさも重要。
- クラス名: ユースケースと実装のための命名。プログラム的に適切な命名が重要。

### 依存の方向

- Facade は `storeWriter` にのみ書き込む。ストアへの直接 `.set()` は Facade の外では呼ばない。
- `+page.svelte` は Facade のメソッドを呼ぶだけ。ゲームロジックを持ち込まない。
- インフラ層（Adapter）は `routes/` や `usecases/` から直接 import しない。`getXxxAdapter()` ファクトリ関数経由で取得する。

---

## ファイルテンプレート（アプリケーション層）

### `store.ts`（全タイプ共通）

```typescript
/**
 * XxxYyy のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const pokeDataStore = writable<PokeData | null>(null);
// ゲーム固有の状態を追加する

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 現在のポケモン（読み取り専用） */
export const pokeData = readonly(pokeDataStore);
// ゲーム固有のエクスポートを追加する

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    pokeDataStore.set(null);
    // ゲーム固有のリセットを追加する
  },
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setPokeData: (value: PokeData | null) => pokeDataStore.set(value),
  // ゲーム固有の setter を追加する
};
```

### `facade.ts` - タイプ別差分

タイプ別のコンストラクタ引数と特有メソッドを示す。共通部分は参考ゲームの実装を参照する。

| タイプ    | 参考ゲーム（ルート）              | コンストラクタ追加引数              | 特有メソッド                         |
| --------- | --------------------------------- | ----------------------------------- | ------------------------------------ |
| Standard  | SilhouetteQuiz (`/dareda`)        | なし                                | ゲーム固有のコマンドのみ             |
| 2dPhysics | HeightComparison (`/kurabe-h`)    | `engine: I2dPhysicsEngine`          | `initialize(config)`, `dispose()`    |
| LLM       | InterrogationQuiz (`/dareda-kai`) | `llmRepository: ILLMChatRepository` | `sendMessage(fetch, text, provider)` |

#### 2dPhysics型のみ：ライフサイクル管理

Standard型と異なる点はコンストラクタと以下の2メソッドのみ。

```typescript
export class XxxYyyFacade {
  constructor(
    private readonly engine: I2dPhysicsEngine,
    private readonly repository: IPokeRepository,
  ) {}

  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    await this.engine.initialize(config);
    storeWriter.reset();
  }

  dispose(): void {
    this.engine.dispose();
  }

  // ゲーム固有のコマンドを追加する
}
```

#### 共通

- ポケモン選出

```typescript
// lib/application/utils/pokeSelectionUtils.ts

// 世代フィルターを考慮してランダムに1体選出
selectRandomPokemon(repository, fetchFn): Promise<PokeData>

// 世代フィルターを考慮してランダムに複数体選出（重複なし）
selectRandomPokemons(repository, fetchFn, count): Promise<PokeData[]>
```

- ローディング制御

```typescript
// lib/application/usecases/usecaseUtils.ts

// 非同期タスクを isLoading フラグで囲み、FacadeResult を返す
withLoadingGuard(task, setIsLoading, onSuccess, onError, errorMessage?)
```

### `index.ts`（全タイプ共通）

```typescript
/**
 * XxxYyy の再エクスポート
 */

import { XxxYyyFacade } from "./facade";
import * as storeFuncs from "./store";

export const XxxYyy = {
  Facade: XxxYyyFacade,
  Store: {
    ...storeFuncs,
  },
};
```

---

## ファイルテンプレート（プレゼンテーション層）

### `+page.svelte` - タイプ別差分

#### Standard型 / LLM型

`onMount`/`onDestroy` は不要。参考ゲームの `+page.svelte` をベースにする。

| タイプ   | 参考ゲーム（ルート）              | インポートする Adapter                          |
| -------- | --------------------------------- | ----------------------------------------------- |
| Standard | SilhouetteQuiz (`/dareda`)        | `getPokeRepository()`                           |
| LLM      | InterrogationQuiz (`/dareda-kai`) | `getLLMChatRepository()`, `getPokeRepository()` |

#### 2dPhysics型：ライフサイクル管理

`onMount`/`onDestroy` で物理エンジンのライフサイクルを管理する。

```svelte
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { XxxYyy } from "$lib/application/usecases/XxxYyy";
  import { getMatterJs2dPhysicsAdapter } from "$lib/infrastructure/adapters/MatterJs2dPhysicsAdapter";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import PhysicsCanvas2d from "$lib/presentation/components/organisms/PhysicsCanvas2d.svelte";
  import { showErrorToast } from "$lib/presentation/utils/toaster";

  const engine = getMatterJs2dPhysicsAdapter();
  const facade = new XxxYyy.Facade(engine, getPokeRepository());
  const { isLoading, pokeDataList } = XxxYyy.Store;

  let isReady = $state(false);

  onMount(async () => {
    await facade.initialize({ width: 400, height: 300, gravity: 1 });
    isReady = true;
    await handlePick();
  });

  onDestroy(() => {
    facade.dispose();
  });

  async function handlePick(): Promise<void> {
    const result = await facade.pickPokemons(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ゲームタイトル</h1>

  {#if isReady}
    <PhysicsCanvas2d {engine} width={400} height={300} />
  {/if}
</div>
```

#### 共通

- SE 再生（+page.svelte で使用）

```typescript
// lib/presentation/sounds/
import { playSE } from "$lib/presentation/sounds/sePlayer";

playSE.correct(); // 正解音
playSE.incorrect(); // 不正解音
```

- 鳴き声再生（+page.svelte で使用）

```typescript
import { resolvedCryUrl } from "$lib/domain/models/PokeData";
import { getAudioOn } from "$lib/presentation/stores/audioStore";

const cryUrl = resolvedCryUrl(pokeData.cryUrls);
if (cryUrl && getAudioOn()) {
  new Audio(cryUrl).play().catch(() => {});
}
```

- ページ遷移

```typescript
// SvelteKit の <a href> は base path 非考慮のため使わない
import { navigateTo } from "$lib/presentation/utils/navigation";
navigateTo("/xxx-yyy");
```

- `$effect` の使い方

```typescript
// 世代フィルター変更時の再初期化（store 購読）
$effect(() => {
  const _ = $generationStore; // 購読宣言（未使用変数の警告を避けるため _ で受ける）
  void handleInitialize();
});

// SE 再生（初回スキップパターン）
let seEffectReady = false;
$effect(() => {
  const currentResult = $result;
  if (!seEffectReady) {
    seEffectReady = true;
    return;
  }
  if (currentResult?.isCorrect) playSE.correct();
  else if (currentResult) playSE.incorrect();
});
```

---

## 新ゲーム追加チェックリスト

### 1. Application 層

- [ ] `lib/application/usecases/XxxYyy/store.ts` を作成する
- [ ] `lib/application/usecases/XxxYyy/facade.ts` を作成する
- [ ] `lib/application/usecases/XxxYyy/index.ts` を作成する（`{ Facade, Store }` を再エクスポート）

### 2. Presentation 層

- [ ] `routes/(auth)/xxx-yyy/+page.svelte` を作成する
- [ ] ページ固有のコンポーネントは `routes/(auth)/xxx-yyy/_components/` に配置する

### 3. ナビゲーション登録

- [ ] ホームページ（`routes/(auth)/(root)/+page.svelte`）のゲーム一覧にリンクを追加する
- [ ] `apps/skeleton-app/README.md` のミニゲーム表に行を追加する

### 4. 品質確認

- [ ] `npm run lint` を通す
- [ ] `npm run check` を通す（svelte-check）
- [ ] 主要操作を手動で動作確認する

---

## 補足: ボイラープレートの抽象化について

**現時点では追加の抽象化は行わない。** 理由は以下のとおり。

- **Store**: `isLoading` は全タイプ共通だが、それ以外の状態はゲーム固有フィールドが大部分を占める。Svelte の `writable()` はクラス継承を想定した設計でないため、共通基底を作るコストに見合う効果が得られない。
- **Facade（2dPhysics型）**: `initialize/dispose` の実装は3ゲームで共通に見えるが、`WeightComparison` だけコンストラクタで `ISeesawPhysicsEngine`（`I2dPhysicsEngine` のサブタイプ）を要求する。抽象基底クラスに収めると型が歪む。
- **+page.svelte（2dPhysics型）**: `onMount/onDestroy` のパターンは共通だが、`PhysicsCanvas2d` への props やゲーム固有の操作ボタン構成が異なる。Svelte にはコンポーネント継承がないため、共通化するとしたら `use:` ディレクティブや高階コンポーネントになり、逆に複雑になる。
- **既存のユーティリティで十分**: `withLoadingGuard` と `selectRandomPokemon/s` がすでに主要なロジック重複を吸収している。

ゲーム数が増えてパターンがさらに安定した段階で再評価する。
