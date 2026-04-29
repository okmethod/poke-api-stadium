/**
 * PokeData 参照型 - 追加エンドポイント取得が必要なデータへの軽量参照
 */

/** 特性参照（詳細は /ability/{id} で別途取得） */
export interface AbilityRef {
  readonly name: string;
  readonly url: string;
  readonly isHidden: boolean;
}

/** 進化チェーン参照（詳細は /evolution-chain/{id} で別途取得） */
export interface EvolutionChainRef {
  readonly url: string;
}

/** バリエーション（フォーム）参照 */
export interface VarietyRef {
  readonly name: string;
  readonly url: string;
  readonly isDefault: boolean;
}
