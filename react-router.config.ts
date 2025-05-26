import type { Config } from "@react-router/dev/config";
import { RemixVitePWA } from "@vite-pwa/remix";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
