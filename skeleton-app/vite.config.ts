import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

const githubRepo = "my-static-site";

export default defineConfig({
  plugins: [sveltekit(), purgeCss()],
  // Github Pagesで公開する場合は、base にリポジトリ名を指定
  base: `/${githubRepo}/`,
});
