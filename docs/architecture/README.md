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

### [overview.md](./overview.md)

**内容**:

- レイヤー構成と依存関係ルール
- Port/Adapter パターン（PokeAPI の抽象化）
- ディレクトリ構造
- データフロー
- 世代フィルタの管理方針

---

## 読む順序

1. **実装開始前**: まず [overview.md](./overview.md) でレイヤー構成と Port/Adapter パターンを理解
2. **実装開始前**: 改修箇所に応じて、各種設計ドキュメントを確認
