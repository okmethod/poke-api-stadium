/**
 * StubLLMChatRepository - ネットワーク不要のスタブ実装
 *
 * バックエンドを起動せずにローカル開発・テストを可能にする。
 * VITE_DEFAULT_LLM_PROVIDER=stub のとき LLMChatRepositoryFactory が選択する。
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 */

import type { ILLMChatRepository, StreamChatParams } from "$lib/application/ports/ILLMServiceRepository";

const STUB_CHUNKS = [
  "私は",
  "ダミーの",
  "LLM",
  "です。",
  "実際の",
  "推論は",
  "せず、",
  "固定の",
  "メッセージを",
  "回答して",
  "います。",
];

class StubLLMChatRepository implements ILLMChatRepository {
  async streamChat(
    _fetchFn: typeof fetch,
    _params: StreamChatParams,
    onChunk: (text: string) => void,
  ): Promise<void> {
    for (const text of STUB_CHUNKS) {
      await new Promise((r) => setTimeout(r, 100));
      onChunk(text);
    }
  }
}

let instance: ILLMChatRepository | null = null;

/** StubLLMChatRepository の Singleton getter */
export function getStubLLMChatRepository(): ILLMChatRepository {
  if (!instance) {
    instance = new StubLLMChatRepository();
  }
  return instance;
}
