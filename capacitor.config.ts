import type { CapacitorConfig } from "@capacitor/cli";

const devMode = process.env.CAPACITOR_DEV === "true";

const config: CapacitorConfig = {
  appId: "com.picklr.sukooshot",
  appName: "Suko o Shot",
  webDir: "dist",
  // Local dev: point the native shell at the Vite dev server so changes
  // hot-reload inside the simulator without rebuilding each time.
  ...(devMode && {
    server: {
      url: "http://localhost:5180",
      cleartext: true,
    },
  }),
  ios: {
    // Let CSS own the safe-area insets (avoids OS-level scroll insets that
    // can produce black bars top/bottom). Matches the Picklr setup.
    contentInset: "never",
    limitsNavigationsToAppBoundDomains: false,
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: "#050507",
      launchFadeOutDuration: 300,
      showSpinner: false,
    },
    StatusBar: {
      // The app draws its own dark background under the status bar.
      overlaysWebView: true,
      style: "DARK",
    },
  },
};

export default config;
