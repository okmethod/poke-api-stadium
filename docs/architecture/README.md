# アーキテクチャ

どのような構造で実装するかを記述した、**技術的な設計方針**を整理する。

---

## ファイル一覧

### テスト戦略: [testing-strategy.md](./testing-strategy.md)

**内容**:

- テストピラミッド（Unit / Integration / E2E）
- Vitest テスト（Unit + Integration）
- Playwright テスト（E2E）
- 各レイヤーで検証すること・しないこと

---

TODO: アーキテクチャドキュメントを追加したらここに列挙する

### 例: [overview.md](./overview.md)

**内容**:

- レイヤー構成と依存関係
- データフロー
- ディレクトリ構造

---

## 読む順序

1. **実装開始前**: まず [overview.md](./overview.md) でレイヤー構成と設計原則を理解
2. **実装開始前**: 改修箇所に応じて、各種設計ドキュメントを確認
