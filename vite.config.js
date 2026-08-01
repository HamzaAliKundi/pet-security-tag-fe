import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expose on network (0.0.0.0)
    port: 5173,
    // Allow HTTPS tunnels (ngrok/cloudflared) so Apple Pay can be tested locally.
    // Apple Pay requires HTTPS on a Stripe-registered domain, which localhost cannot be.
    allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.trycloudflare.com']
  },
  // `npm run build && npm run preview` serves the bundled app on the same port, so the
  // existing tunnel URL (already registered with Stripe) keeps working. Far fewer requests
  // than the dev server, which matters a lot on slow mobile connections.
  preview: {
    host: true,
    port: 5173,
    allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.trycloudflare.com']
  }
})
