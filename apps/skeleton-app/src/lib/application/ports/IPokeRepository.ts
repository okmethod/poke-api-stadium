/**
 * IPokeRepository - Port/Adapter パターンの Port (抽象/契約定義)
 *
 * @remarks
 * - テスト時にモック実装を注入可能
 * - 将来的に別のデータソース（ローカルキャッシュ等）への切り替えが容易
 * - PokeAPI の実装詳細からアプリ層を完全に分離
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: インフラ層が実装すべき抽象インターフェース（契約）の定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 *
 * Note: アプリ層 DTO を設けず、ドメイン層に直接依存させる理由
 * - 本プロジェクトのミニゲーム（じゃんけん・だれだ・くらべ・しりとり）は
 *   Application 層の usecase として実装するため、ドメイン層に厚いロジックを置かない
 * - `jaName` / `imageUrl` はゲームルール（だれだ・しりとり）の判定にも使うため
 *   「表示専用データ」が存在せず、DTO 分離のメリットが薄い
 * - ドメインロジックが厚くなった際に DTO 分離を改めて検討する
 */

import type { PokeData, VarietyRef, AbilityRef } from "$lib/domain/models/PokeData";
import type { PokeTypeData } from "$lib/domain/models/PokeData/pokeType";
import type { EvolutionChain } from "$lib/domain/models/EvolutionChain";
import type { FormVariant } from "$lib/domain/models/FormVariant";
import type { PokeAbility } from "$lib/domain/models/PokeAbility";
import type { PokeMove, MoveLearnDetail } from "$lib/domain/models/PokeMove";
import type { PokeItem } from "$lib/domain/models/PokeItem";

/** PokeAPI データ取得の抽象インターフェース */
export interface IPokeRepository {
  /** 図鑑番号または英語名でポケモンデータを取得 */
  getPokemon(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeData>;

  /**
   * 複数の図鑑番号からポケモン辞書を取得
   *
   * 取得失敗したIDはスキップしてログのみ出力する（ミニゲーム用途で部分失敗を許容）。
   */
  getPokemons(fetchFunction: typeof fetch, ids: number[]): Promise<Record<string, PokeData>>;

  /** 番号またはタイプ名でタイプデータを取得 */
  getType(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeTypeData>;

  /** 複数のタイプ名からタイプ辞書を取得 */
  getTypes(fetchFunction: typeof fetch, names: string[]): Promise<Record<string, PokeTypeData>>;

  /** 進化チェーン参照 URL から進化チェーンデータを取得 */
  getEvolutionChain(fetchFunction: typeof fetch, url: string): Promise<EvolutionChain>;

  /**
   * バリエーション参照リストからフォーム詳細を取得
   *
   * @param defaultJaName デフォルトフォームの日本語名（form_names が空の場合のフォールバック）
   */
  getFormVariants(
    fetchFunction: typeof fetch,
    varieties: readonly VarietyRef[],
    defaultJaName: string,
  ): Promise<readonly FormVariant[]>;

  /** 特性参照リストから特性詳細を一括取得 */
  getAbilities(fetchFunction: typeof fetch, abilityRefs: readonly AbilityRef[]): Promise<readonly PokeAbility[]>;

  /**
   * 習得可能わざ参照リストのスライスからわざ詳細を取得
   *
   * ページネーション用途を想定し、呼び出し元でスライスしてから渡す。
   */
  getMoves(fetchFunction: typeof fetch, details: readonly MoveLearnDetail[]): Promise<readonly PokeMove[]>;

  /** 番号または英語名でアイテムデータを取得 */
  getItem(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokeItem>;
}
