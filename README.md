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

  subgraph Server["サーバー"]
    API["API サーバー"]
  end

  Assets -->|配信| SPA
  SPA -->|REST API| API
```

**技術スタック**:

- **フロントエンド**: Skeleton v4 (Svelte v5 + TailwindCSS v4 + Vite v6)
- **バックエンド**: Python 3.13 + FastAPI
- **インフラ**: Docker Compose でワンコマンド起動

TODO: バックエンドのホストとデプロイ検討

---

## ディレクトリ構成

```
poke-api-stadium/
├── apps/
│   ├── skeleton-app/      # フロントエンド (Skeleton)
│   └── fast-api-server/   # バックエンド (FastAPI)
└── docs/                  # ドキュメント
```

---

## ローカル起動

```bash
docker compose up
```

---

## デプロイ

GitHub Pages への静的デプロイ:

```bash
cd apps/skeleton-app
npm run deploy
```

**公開 URL**: https://okmethod.github.io/poke-api-stadium/

---

**メンテナー**: @okmethod
