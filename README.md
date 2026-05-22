# Poke API スタジアム

> PokeAPI を利用したミニゲーム集アプリ

## プロジェクト概要

[PokeAPI](https://pokeapi.co/) で取得したポケモンのデータを使ったミニゲーム集を提供する。

---

## ディレクトリ構成

```
poke-api-stadium/
├── apps/
│   └── skeleton-app/  # フロントエンド (Skeleton)
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

**LLM ゲートウェイ**: [okmethod/multi-ai-gateway](https://github.com/okmethod/multi-ai-gateway)

**公開 URL**: https://okmethod.github.io/poke-api-stadium/

---

**メンテナー**: @okmethod
