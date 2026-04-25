# Poke API スタジアム

> PokeAPI を利用したミニゲーム集アプリ

## プロジェクト概要

[PokeAPI](https://pokeapi.co/) で取得したポケモンのデータを使ったミニゲーム集を提供する。

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
