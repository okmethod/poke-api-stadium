# Poke API スタジアム

> PokeAPI を利用したミニゲーム集アプリ

## プロジェクト概要

[PokeAPI](https://pokeapi.co/) で取得したポケモンのデータを使ったミニゲーム集を提供する。

---

## アーキテクチャ

```mermaid
graph LR
  subgraph Browser["ユーザー"]
    SPA["SPA"]
  end

  subgraph GHPages["GitHub Pages"]
    Assets["SPAアセット"]
  end

  subgraph CF["Cloudflare"]
    API["API サーバー<br>(Workers)"]
    AIGateway["AI Gateway"]
  end

  LLM["LLM プロバイダー"]

  Assets -->|配信| SPA
  SPA -->|REST API| API
  API --> AIGateway
  AIGateway --> LLM
```

**技術スタック**:

- **フロントエンド**: TypeScript 6, Skeleton v4 (Svelte v5 + TailwindCSS v4 + Vite v6)
- **バックエンド**: TypeScript 5, Hono v4, Wrangler v3
- **インフラ**: GitHub Pages（フロントエンド） / Cloudflare Workers（バックエンド）

---

## ディレクトリ構成

```
poke-api-stadium/
├── apps/
│   ├── skeleton-app/  # フロントエンド (Skeleton)
│   └── hono-server/   # バックエンド (Hono)
└── docs/              # ドキュメント
```

---

## ローカル起動

```bash
docker compose up
```

---

## デプロイ

**フロントエンド**（GitHub Pages）:

```bash
cd apps/skeleton-app
npm run deploy
```

**バックエンド**（Cloudflare Workers）:

```bash
cd apps/hono-server
npm run deploy
```

**公開 URL**: https://okmethod.github.io/poke-api-stadium/

---

**メンテナー**: @okmethod
