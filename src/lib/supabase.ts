import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mqyuspqsvcxvfqbmzhch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeXVzcHFzdmN4dmZxYm16aGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwOTE5OTMsImV4cCI6MjA0OTY2Nzk5M30.R-_esL_-qAXgyrH2TbKVVn4q8auH3egNAX_Tg-glBpE'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL e Anon Key são necessários')
}

console.log('Inicializando Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key disponível:', !!supabaseAnonKey)

// Configuração do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
})
