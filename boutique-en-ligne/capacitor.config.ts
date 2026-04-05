import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'CabaStore',
  webDir: 'out',
  server: {
    url: 'https://test-rosy-omega-60.vercel.app/',
    cleartext: false,
    androidScheme: 'https',
  },
  plugins: {
    Browser: {
      presentationStyle: 'popover',
    },
  },
};

export default config;