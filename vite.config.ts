import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Split heavy 3D/postprocessing libs into a separate cached chunk
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-three': ['three', 'postprocessing'],
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['motion/react'],
          },
        },
      },
      // Reduce bundle size in production
      minify: 'esbuild' as const,
      target: 'esnext',
    },
  };
});
