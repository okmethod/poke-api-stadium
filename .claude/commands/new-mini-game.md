---
description: 新しいポケモンミニゲームを追加する。ゲームのアイデアを引数で渡すと、4層 Clean Architecture に沿ったコードを生成してルート登録まで行う。
argument-hint: <ゲームのアイデアや概要>
---

新しいポケモンミニゲームを追加する。以下の手順に従うこと。

## ユーザーからの入力

$ARGUMENTS

（引数が空の場合は、ゲームのルール・目的・操作概要をヒアリングしてから進む）

## 現在の状態

```!
cd apps/skeleton-app && ls src/routes/\(auth\)/
```

```!
cd apps/skeleton-app && ls src/lib/application/usecases/
```

## 参照ドキュメント

作業前に必ず読む:

- `docs/architecture/mini-game.md` — ゲーム型分類・テンプレート・チェックリスト
- `docs/architecture/overview.md` — 4層構造・依存ルール

## 手順

### 1. ゲーム型の判定

`docs/architecture/mini-game.md` の分類に従い、どのタイプかを判定してユーザーに提示・合意を取る:

- **Standard型** — PokeAPI 取得＋クイズ・ゲームロジック（例: SilhouetteQuiz）
- **2dPhysics型** — Matter.js を使う物理シミュレーション（例: HeightComparison）
- **LLM型** — SSE ストリーミングチャット（例: InterrogationQuiz）

### 2. 命名の決定

- ユースケース名: `XxxYyy`（PascalCase）
- ルートパス: `xxx-yyy`（kebab-case）

### 3. コード生成

`docs/architecture/mini-game.md` のテンプレートを参照して、以下の順で生成する:

1. `lib/application/usecases/XxxYyy/store.ts`
2. `lib/application/usecases/XxxYyy/facade.ts`
3. `lib/application/usecases/XxxYyy/index.ts`
4. `routes/(auth)/xxx-yyy/+page.svelte`
5. ページ固有コンポーネント（必要な場合のみ `_components/` に配置）

### 4. ナビゲーション登録

- ホームページ（`routes/(auth)/(root)/+page.svelte`）のゲーム一覧にリンクを追加
- `apps/skeleton-app/README.md` のミニゲーム表に行を追加

### 5. 品質確認

```bash
cd apps/skeleton-app && npm run lint && npm run check
```

## 生成時の注意点

- `+page.svelte` にゲームロジックを書かない → Facade に委譲する
- Store への書き込みは必ず `storeWriter` 経由
- `<a href>` は使わず `navigateTo()` を使う（base path 対応）
- Svelte 5 Runes 記法（`$state`, `$derived`, `$effect`）を使う
- コメントは「なぜ」だけ書く（日本語）。JSDoc は根幹部分のみ
