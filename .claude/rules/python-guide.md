---
description: Python/FastAPI の開発規約・コマンド
globs: "apps/fast-api-server/**/*.py"
---

# Python / FastAPI

- **言語**: Python 3.13
- **FW**: FastAPI 0.136+, Pydantic v2
- **パッケージ管理**: uv
- **タスクランナー**: poethepoet (`uv run poe <task>`)

## 開発規約

- 型アノテーションは全関数・全変数に必須（mypy strict 相当）
- コメントは**日本語**を基本とし、ログやエラーメッセージは**英文**を基本とする
- import 文はファイル先頭にまとめる（処理内のローカルインポート禁止）
- `pyproject.toml` の lint ルールを除外(ignore)する場合は必ずコメントで理由を記載する
- 未実装・負債は `# TODO:` / `# FIXME:` コメントで明示する

## よく使うコマンド（apps/fast-api-server/ 内）

```bash
uv run poe lint          # ruff format + ruff check + mypy
uv run poe fix           # ruff format + ruff check --fix
uv run poe test          # pytest tests/
```
