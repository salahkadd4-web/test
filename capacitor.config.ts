import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cabastore.app',
  appName: 'CabaStore',
  webDir: 'out',
  server: {
    url: 'https://caba-store.vercel.app/',
    cleartext: false,
    androidScheme: 'https',
  },
  plugins: {
    SocialLogin: {
      providers: {
        google: true,
      },
    },
  },
};

export default config;
