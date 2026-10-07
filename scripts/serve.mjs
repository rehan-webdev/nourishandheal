// Production preview server.
// Launched via `npm run start`; any extra CLI flags appended by the host
// (e.g. --hostname) are intentionally ignored — Vite's CLI would reject them.
// allowedHosts: true permits the reverse-proxy hostname of the preview.
import { preview } from "vite";

await preview({
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: true,
  },
});
