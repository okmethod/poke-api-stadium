import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

const githubRepo = "poke-api-stadium";

const content404 = ((base: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found</title>
  <meta http-equiv="refresh" content="0; url=/#/">
  <script>
    // Redirect to the root URL
    var path = window.location.pathname;
    var newUrl = window.location.origin + '/${base}/';
    window.location.replace(newUrl);
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`)(githubRepo);

export default defineConfig({
  plugins: [
    sveltekit(),
    purgeCss(),
    {
      name: "generate-404",
      closeBundle() {
        const dirPath = path.resolve(__dirname, "build");
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = path.resolve(dirPath, "404.html");
        fs.writeFileSync(filePath, content404);
        console.log("404.html generated");
      },
    },
  ],
  // Github Pagesで公開する場合は、base にリポジトリ名を指定
  base: `/${githubRepo}/`,
});
