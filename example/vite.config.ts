import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      // Point to the library source so we can develop in parallel
      'react-native-relatives-tree': path.resolve(__dirname, '../src'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
  },
  server: {
    port: 3000,
    open: true,
  },
});
