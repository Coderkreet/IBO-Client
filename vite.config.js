import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 6079,
    allowedHosts:['https://IBOCOIN.io','http://www.IBOCOIN.io','http://IBOCOIN.io','IBOCOIN.io','IBOCOIN.org','IBOCOIN.xyz','www.IBOCOIN.io','https://IBOCOIN.org','http://www.IBOCOIN.org','http://IBOCOIN.org','www.IBOCOIN.org','https://IBOCOIN.xyz','http://www.IBOCOIN.xyz','http://IBOCOIN.xyz','www.IBOCOIN.xyz'],
  },
  preview:{
    port: 6079,
    allowedHosts:['https://IBOCOIN.io','http://www.IBOCOIN.io','http://IBOCOIN.io','IBOCOIN.io','IBOCOIN.org','IBOCOIN.xyz','www.IBOCOIN.io','https://IBOCOIN.org','http://www.IBOCOIN.org','http://IBOCOIN.org','www.IBOCOIN.org','https://IBOCOIN.xyz','http://www.IBOCOIN.xyz','http://IBOCOIN.xyz','www.IBOCOIN.xyz'],
  }
})
