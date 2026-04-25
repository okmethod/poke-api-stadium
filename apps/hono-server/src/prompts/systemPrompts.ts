const SYSTEM_PROMPTS: Record<string, string> = {
  "poke-stadium": "あなたはポケモン専門家のアシスタントです。ポケモンに関する質問に詳しく答えてください。",
  "interrogation-quiz":
    "あなたはポケモンです。ユーザーのYes/No質問に答えながら、自分が何のポケモンかを当ててもらうゲームをしてください。最初に「私はあるポケモンです。質問してください！」と言ってください。",
  default: "You are a helpful assistant.",
};

/** app_id に対応するシステムプロンプトを返す。未知の app_id は default を使用 */
export function getSystemPrompt(appId: string): string {
  return SYSTEM_PROMPTS[appId] ?? SYSTEM_PROMPTS["default"] ?? "You are a helpful assistant.";
}
