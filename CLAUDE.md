# CLAUDE.md

---

## 行動原則

- **回答は日本語で簡潔に行う**
- **コミット前に必ず lint/format を実行する**
- **サブエージェントを積極活用しトークン節約する**:
  - 3ファイル以上の調査・コード検索 → Explore
  - 実装計画の策定 → Plan
  - テスト/Lint/ビルド実行 → Bash (background可)

---

## プロジェクト概要

PokeAPI の豊富なポケモンデータを活用したミニゲーム集

- **リポジトリ**: https://github.com/okmethod/poke-api-stadium
- **技術スタック**:
  - TypeScript 6, Skeleton v4 (Svelte v5 + TailwindCSS v4 + Vite v6)
  - Python 3.13, FastAPI
- **前身プロジェクト**: https://github.com/okmethod/poke-api-stadium-v1
  - 本プロジェクトでは、大規模な設計変更をしつつ再構築中

## ディレクトリ

- `apps/skeleton-app/`: Skeleton フロントエンド
- `apps/fast-api-server/`: FastAPI サーバー