import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    // Pin to 127.0.0.1 + a fixed port. The intermittent "426 Upgrade Required"
    // comes from something (antivirus HTTPS-scanning, HSTS, or a proxy) trying
    // to upgrade the connection on the "localhost" hostname. Binding to the raw
    // IP usually side-steps those hooks. Open http://127.0.0.1:5173 in the browser.
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Keep the HMR websocket on the same host/port to avoid protocol confusion.
    hmr: {
      host: '127.0.0.1',
      protocol: 'ws',
    },
  },
})
