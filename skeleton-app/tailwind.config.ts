import { join } from "path";
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { skeleton } from "@skeletonlabs/tw-plugin";

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
        preset: [
          {
            name: "rocket",
            enhancements: true,
          },
        ],
      },
    }),
  ],
} satisfies Config;
