interface ImportMetaEnv {
  readonly VITE_COINGECKO_API_BASE_URL: string;
  readonly VITE_COINGECKO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
