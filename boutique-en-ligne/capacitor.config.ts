import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cabastore.app',
  appName: 'CabaStore',
  webDir: 'out',
  server: {
    url: 'https://test-rosy-omega-60.vercel.app/', // ← mets ton URL Vercel ici
    cleartext: false,
  },
};

export default config;