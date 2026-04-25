# マルチアプリ共用 LLM ゲートウェイプロキシ

GitHub Pages でホスティングされる複数のフロントエンドアプリから共通で利用できる、軽量・低遅延なバックエンド。

---

## 技術スタック

- **開発環境**: Node.js 24
  - パッケージ管理: npm
  - Linter & Formatter: ESLint + Prettier
  - Type checker: tsc
  - Test: Vitest
  - Task Runner: npm scripts
- **言語**: TypeScript v5
- **Web フレームワーク**: Hono v4
- **ビルド・ホスティング**: Wrangler v3 + Cloudflare Workers

---

## ディレクトリ構成

```
apps/hono-server/
├── wrangler.toml      # Cloudflare Workers デプロイ設定
│
├── src/
│   ├── index.ts       # Hono エントリポイント
│   ├── types/         # 環境変数型定義
│   ├── schemas/       # Zod スキーマ定義
│   ├── prompts/       # システムプロンプト
│   ├── services/      # 外部システム連携（LLM ゲートウェイ）
│   ├── routes/        # API エンドポイント
│   ├── middleware/    # Hono ミドルウェア
│   └── utils/         # ユーティリティ
│
└── tests/             # ユニットテスト
```

---

## 主な機能

1. **パスフレーズ認証**
   - `X-App-Secret` ヘッダーで認証。不一致は `403 Forbidden`。

2. **マルチアプリ対応**
   - `app_id` に基づきシステムプロンプトを動的に切り替え

3. **マルチプロバイダー対応**
   - リクエストボディの `provider` フィールドで切り替え：`gemini` / `claude` / `groq` / `stub`。
   - 各プロバイダーの API 仕様差分はゲートウェイ層で吸収。

4. **SSE ストリーミング**
   - LLM の生成結果を逐次クライアントへ流す（Server-Sent Events 形式）。
   - Cloudflare AI Gateway を経由してキャッシュ・モニタリングを統合管理。

---

## API エンドポイント

### `GET /api/health`

ヘルスチェック。認証不要。

```json
{ "message": "alive", "app_version": "1.0.0" }
```

**実行例:**

```bash
curl http://localhost:8787/api/health | jq
```

### `POST /api/chat`

AI チャット。`X-App-Secret` ヘッダー必須。レスポンスは `text/event-stream`。

**リクエストボディ:**

```json
{
  "app_id": "poke-stadium",
  "message": "ピカチュウについて教えて",
  "history": [
    { "role": "user", "content": "ポケモンについて知りたい" },
    { "role": "model", "content": "ポケモンは..." }
  ],
  "provider": "gemini"
}
```

**実行例:**

```bash
curl -s -X POST http://localhost:8787/api/chat \
  -H "Content-Type: application/json" \
  -H "X-App-Secret: local-dev-secret" \
  -d '{"app_id": "poke-stadium", "message": "こんにちは？", "provider": "stub"}'
```

---

## 環境変数

| 変数名                | 必須 | 説明                                                        |
| --------------------- | ---- | ----------------------------------------------------------- |
| `APP_SECRET`          | ✅   | パスフレーズ認証用シークレット                              |
| `AI_GATEWAY_BASE_URL` | ✅   | Cloudflare AI Gateway ベース URL                            |
| `AI_GATEWAY_TOKEN`    | ✅   | AI Gateway 認証トークン                                     |
| `ALLOWED_ORIGINS`     | -    | CORS 許可オリジン（カンマ区切り）                           |
| `GEMINI_MODEL`        | -    | Gemini モデル名（デフォルト: `gemini-2.0-flash-lite`）      |
| `CLAUDE_MODEL`        | -    | Claude モデル名（デフォルト: `claude-3-5-haiku-20241022`）  |
| `GROQ_MODEL`          | -    | Groq モデル名（デフォルト: `llama-3.2-11b-vision-preview`） |

---

## 開発コマンド（`apps/hono-server/` 内）

```bash
npm run dev      # ローカル開発サーバー起動（wrangler dev）
npm run lint     # prettier check + eslint + tsc
npm run format   # prettier format
npm run check    # tsc --noEmit
npm run test:run # vitest run
```

---

## デプロイ（Cloudflare Workers）

```bash
# シークレット設定（初回のみ）
npm run put-secrets

# デプロイ
npm run deploy
```

---

## 拡張方法

**アプリ追加:**

1. `src/prompts/systemPrompts.ts` に `app_id` とプロンプトを追加

**プロバイダー追加:**

1. `src/services/gateway/{provider}.ts` を新規作成（`stream` 関数を実装）
2. `src/schemas/chat.ts` の `LLMProvider` に追加
3. `src/services/gateway/protocol.ts` のルーティングに追加
