import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      strategies: "generateSW",

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "amana-kids",
        short_name: "amana-kids",
        description:
          "Amana kids é o app para o gerenciamento e organização das informações das crianças da igreja amana.",
        theme_color: "#000000",
      },

      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallback: "/",
        navigateFallbackAllowlist: [/^\/$/],
        type: "module",
      },
    }) as any,
  ],
});
