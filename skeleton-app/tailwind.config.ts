import { join } from "path";
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { skeleton } from "@skeletonlabs/tw-plugin";

enum Theme {
  Skeleton = "skeleton",
  Wintry = "wintry",
  Modern = "modern",
  Rocket = "rocket",
  Seafoam = "seafoam",
  Vintage = "vintage",
  Sahara = "sahara",
  Hamlindigo = "hamlindigo",
  GoldNouveau = "gold-nouveau",
  Crimson = "crimson",
}

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}"),
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px", // 480px 以上のカスタムブレークポイント
      },
      brightness: {
        85: "0.85",
      },
    },
  },
  extend: {
    scrollbarGutter: {
      stable: "stable",
    },
  },
  variants: {
    extend: {
      brightness: ["hover"],
    },
  },
  plugins: [
    forms,
    typography,
    skeleton({
      themes: {
        preset: Object.values(Theme).map((theme) => ({
          name: theme,
          enhancements: true,
        })),
      },
    }),
  ],
} satisfies Config;
