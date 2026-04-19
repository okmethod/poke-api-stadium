# マルチアプリ共用 LLM ゲートウェイプロキシ

GitHub Pages でホスティングされる複数のフロントエンドアプリから共通で利用できる、軽量・低遅延なバックエンド。

---

## 技術スタック

- **開発環境**: Python3.13 系
  - パッケージ管理: uv
  - Linter & Formatter: ruff
  - Type checker: mypy
  - Test: pytest
  - Task Runner: poethepoet
- **Web フレームワーク**: FastAPI + Uvicorn
- **AI 管理バックエンド**: Cloudflare AI Gateway
- **ホスティング**: Cloudflare Workers + Wrangler

---

## ディレクトリ構成

```
apps/fast-api-server/
├── pyproject.toml     # プロジェクト設定・依存関係
│
├── wrangler.toml      # Cloudflare Workers デプロイ設定
│
├── src/
│   ├── main.py        # FastAPI エントリポイント
│   ├── settings.py    # Pydantic Settings（環境変数管理）
│   ├── schemas/       # 共通 Pydantic スキーマ定義
│   ├── prompts/       # システムプロンプト
│   ├── services/      # 外部システム連携
│   ├── routes/        # API エンドポイント
│   └── middleware/    # FastAPI ミドルウェア
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

---

## 環境変数

| 変数名                | 必須 | 説明                                                       |
| --------------------- | ---- | ---------------------------------------------------------- |
| `APP_SECRET`          | ✅   | パスフレーズ認証用シークレット                             |
| `AI_GATEWAY_BASE_URL` | ✅   | Cloudflare AI Gateway ベース URL                           |
| `AI_GATEWAY_TOKEN`    | ✅   | AI Gateway 認証トークン                                    |
| `ALLOWED_ORIGINS`     | -    | CORS 許可オリジン（カンマ区切り）                          |
| `GEMINI_MODEL`        | -    | Gemini モデル名（デフォルト: `gemini-1.5-flash`）          |
| `CLAUDE_MODEL`        | -    | Claude モデル名（デフォルト: `claude-3-5-haiku-20241022`） |
| `GROQ_MODEL`          | -    | Groq モデル名（デフォルト: `llama-3.3-70b-versatile`）     |

---

## 開発コマンド（`apps/fast-api-server/` 内）

```bash
uv run poe lint          # ruff format + ruff check + mypy
uv run poe fix           # ruff format + ruff check --fix
uv run poe test          # pytest tests/
uv run poe test-coverage # カバレッジ付きテスト
```

---

## デプロイ（Cloudflare Workers）

```bash
# シークレット設定（初回のみ）
wrangler secret put APP_SECRET
wrangler secret put AI_GATEWAY_BASE_URL
wrangler secret put AI_GATEWAY_TOKEN

# デプロイ
wrangler deploy
```

---

## 拡張方法

**アプリ追加:**

1. `src/prompts/system_prompts.py` に `app_id` とプロンプトを追加

**プロバイダー追加:**

1. `src/services/gateway/{provider}.py` を新規作成（`stream` 関数を実装）
2. `src/schemas/chat.py` の `LLMProvider` に追加
3. `src/services/gateway/protocol.py` の `match` 式に追加
