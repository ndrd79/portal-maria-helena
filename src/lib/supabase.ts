import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Inicializando Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key disponível:', !!supabaseKey)

if (!supabaseUrl) {
  console.error('NEXT_PUBLIC_SUPABASE_URL não está definido')
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!supabaseKey) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY não está definido')
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
