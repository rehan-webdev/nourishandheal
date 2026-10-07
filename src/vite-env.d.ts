/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key for booking + order form submissions. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
