import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3003',
                changeOrigin: true
            }
        }
    },
    test: {
        environment: 'jsdom',
        globals: true, // so we dont have to import `describe`, `test`, and `expect`
        setupFiles: './testSetup.js' // where we reset jsdom after each test
    }
})
