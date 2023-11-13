import react from "@vitejs/plugin-react-swc";
import { cpus } from "os";
import path from "path";
import { defineConfig } from "vite";

function differMuiSourcemapsPlugins() {
  const muiPackages = ["@mui/material", "@emotion/styled", "@emotion/react"];

  return {
    name: "differ-mui-sourcemap",
    transform(code: string, id: string) {
      if (muiPackages.some((pkg) => id.includes(pkg))) {
        return {
          code: code,
          map: null,
        };
      }
    },
  };
}

import type { Plugin } from "vite";

interface SourcemapExclude {
  excludeNodeModules?: boolean;
}
export function sourcemapExclude(opts?: SourcemapExclude): Plugin {
  return {
    name: "sourcemap-exclude",
    transform(code: string, id: string) {
      if (opts?.excludeNodeModules && id.includes("node_modules")) {
        return {
          code,
          // https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
          map: { mappings: "" },
        };
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: "build",
      rollupOptions: {
        cache: false,
        maxParallelFileOps: Math.max(1, cpus().length - 1),
        output: {
          assetFileNames: "assets/[name].[ext]",
          chunkFileNames: "assets/[name].js",
          entryFileNames: "assets/[name].js",
          format: "es",
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          sourcemapIgnoreList: (relativeSourcePath) => {
            const normalizedPath = path.normalize(relativeSourcePath);
            return normalizedPath.includes("node_modules");
          },
        },
      },
      sourcemap: mode === "development" || "hidden",
    },
    envDir: "./",
    plugins: [
      react(),
      sourcemapExclude({ excludeNodeModules: true }),
      differMuiSourcemapsPlugins(),
    ],
    server: {
      port: 3001,
    },
  };
});
