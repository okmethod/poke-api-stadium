// 全アプリ共通のシステムプロンプト
const COMMON_PROMPT =
  "回答は日本語で行ってください。";

// PokeAPIスタジアム用の共通プロンプト
const POKE_COMMON_PROMPT =
  "あなたはポケモンのミニゲームのアシスタントです。" +
  "後述のゲームのルールや指示に応じて、役割を演じてください。" +
  "小学校低学年の子どもが理解できる程度の易しい日本語、親しみやすい態度で会話してください。";

// アプリごとに共通のシステムプロンプト
// ゲーム固有のプロンプトは各ゲームのユースケース側で定義し、
// リクエストの system_prompt フィールドで渡す。
const APP_PROMPTS: Record<string, string> = {
  "poke-api-stadium": POKE_COMMON_PROMPT,
};

/**
 * 共通プロンプトとゲーム固有プロンプトを結合して最終的なシステムプロンプトを生成する
 *
 * @param appId - app_id（appPrompt の fallback 解決に使用）
 * @param gamePrompt - フロントエンドから渡されるゲーム固有プロンプト
 */
export function buildSystemPrompt(appId: string, gamePrompt?: string): string {
  return [COMMON_PROMPT, APP_PROMPTS[appId], gamePrompt].filter(Boolean).join("\n\n");
}
