# SPA ミニゲームアプリ

PokeAPI のポケモンデータを使ったミニゲーム集。GitHub Pages でホスティングされる静的 SPA。

---

## 技術スタック

- **開発環境**: Node.js 24
  - パッケージ管理: npm
  - Linter & Formatter: ESLint + Prettier
  - Type checker: svelte-check
  - Test: Vitest / Playwright
  - Task Runner: npm scripts
- **言語**: TypeScript v6
- **Web フレームワーク**: SvelteKit 2 (Svelte 5 Runes)
- **UIライブラリ**: Skeleton v4 + TailwindCSS v4
- **バリデーション**: Zod v4
- **2D物理エンジン**: Matter.js v0.20
- **ビルド・ホスティング**: Vite 6 + GitHub Pages (adapter-static)

---

## ディレクトリ構成

```
apps/skeleton-app/src/
│
├── lib/
│   ├── domain/          # ドメイン層: モデル・型定義
│   ├── application/     # アプリ層: ユースケース・Port インターフェース
│   ├── infrastructure/  # インフラ層: 外部 API・物理エンジンアダプター
│   ├── presentation/    # プレゼン層: Svelte コンポーネント・UI ユーティリティ
│   └── shared/          # 共有ユーティリティ
│
├── routes/              # ページ
│
└── tests/               # テスト
```

---

## 主な機能

1. **ポケモンデータ取得**
   - Poke API にてデータを取得＆バリデーションし、ドメインモデル（`PokeData`）へ統合。
   - 複数 ID 一括取得時は `Promise.all` で並列リクエスト。失敗した ID はスキップしてログ出力。

2. **2D 物理演算**
   - Matter.js による 2D 物理エンジンをアダプターとして実装
   - ブラウザ専用のため dynamic import で遅延読み込み（描画フレームワーク非依存）
   - 画像輪郭からポリゴンボディを自動生成し、失敗時は円ボディへフォールバック
   - 初期化時にワールド境界（4面の壁）を自動生成。重力・反復回数を設定可能

3. **LLM クライアント**
   - LLM ゲートウェイプロキシのエンドポイント呼び出しを抽象化。
   - ゲームごとのゲームルール・指示をシステムプロンプトとしてリクエスト。
   - チャットレスポンスは SSE 形式でテキストチャンクを逐次受信。

---

## ミニゲーム

| パス          | ゲーム名           | 概要                                     |
| ------------- | ------------------ | ---------------------------------------- |
| `/zukan`      | ポケモンずかん     | ポケモンの図鑑情報・ステータスを確認     |
| `/kurabe`     | ポケモン XX くらべ | 各種ステータスでポケモンを並べ替え       |
| `/kurabe-h`   | たかさくらべ 改    | 3体のたかさを物理演算で比較              |
| `/kurabe-w`   | おもさくらべ 改    | 2体のおもさを物理演算で比較              |
| `/eawase`     | ポケモンえあわせ   | 同じポケモンを物理演算で衝突判定して消す |
| `/dareda`     | ポケモンだ〜れだ？ | シルエットからポケモンを当てる           |
| `/dareda-kai` | だ〜れだ？ 改      | LLM チャットに質問してポケモンを当てる   |

---

## 環境変数

| 変数名                      | 必須 | 説明                                |
| --------------------------- | ---- | ----------------------------------- |
| `LOCAL_API_BASE_URL`        | -    | ローカル開発時の API プロキシ転送先 |
| `VITE_API_BASE_URL`         | -    | LLM プロキシサーバーのベース URL    |
| `VITE_DEFAULT_LLM_PROVIDER` | -    | デフォルト LLM プロバイダー         |

---

## 開発コマンド（`apps/skeleton-app/` 内）

```bash
npm run dev          # ローカル開発サーバー起動
npm run lint         # prettier check + eslint + svelte-check
npm run format       # prettier format
npm run check        # svelte-check
npm run test:run     # vitest run
npm run test:e2e     # playwright test
```

---

## デプロイ（GitHub Pages）

```bash
npm run deploy  # vite build → gh-pages でプッシュ
```
