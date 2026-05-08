/** 初回 $effect 実行をスキップし、以降の変化時のみコールバックを実行する */
export function watchEffect<T>(getValue: () => T, callback: (value: T) => void): void {
  let ready = false;
  $effect(() => {
    const value = getValue();
    if (!ready) {
      ready = true;
      return;
    }
    callback(value);
  });
}

/** result の変化時に正解/不正解 SE を再生する（初回マウントはスキップ） */
export function watchResultSE(
  getResult: () => { isCorrect: boolean } | null,
  playSE: { correct: () => void; incorrect: () => void },
): void {
  watchEffect(getResult, (result) => {
    if (result !== null) {
      if (result.isCorrect) playSE.correct();
      else playSE.incorrect();
    }
  });
}
