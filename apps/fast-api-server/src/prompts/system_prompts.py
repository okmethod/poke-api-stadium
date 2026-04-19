# app_id とシステムプロンプトのマッピング
# 新しいアプリを追加する場合はここにエントリを追加する
SYSTEM_PROMPTS: dict[str, str] = {
    "poke-stadium": (  # PokeAPI スタジアム: ポケモン専門のアシスタント
        "あなたはポケモンの専門家アシスタントです。"
        "ポケモンのタイプ、能力、進化、対戦戦略などについて詳しく答えてください。"
        "回答は日本語で行い、親しみやすいトーンを心がけてください。"
    ),
    "default": "You are a helpful assistant.",  # フォールバック: 汎用アシスタント
}


def get_system_prompt(app_id: str) -> str:
    """app_id に対応するシステムプロンプトを返す。未知の app_id は default を使用する。"""
    return SYSTEM_PROMPTS.get(app_id, SYSTEM_PROMPTS["default"])
