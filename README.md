# poke-api-stadium

`gh-pages` ブランチの静的アセットを Github Pages で公開する。  
ポケモンのデータは、 [PokeAPI](https://pokeapi.co/) で取得する。

## ローカルでの起動方法

- コンテナ起動

  ```sh
  docker compose up
  ```

- ブラウザでアクセス

  http://localhost:5173/

## インターネットへの公開方法

- 静的アセットデプロイ

  ```sh
  (cd skeleton-app && npm run build)
  (cd skeleton-app && npm run deploy)
  ```

- ブラウザでアクセス

  https://okmethod.github.io/poke-api-stadium/
