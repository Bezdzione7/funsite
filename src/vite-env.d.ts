/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE_URL?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
