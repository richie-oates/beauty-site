import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yhhnmdyffhlexhonvfaf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloaG5tZHlmZmhsZXhob252ZmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNTM0MTUsImV4cCI6MjA2MTkyOTQxNX0.uNbF2ySeRhv5ETgNvRZS3uu9p9T-kxbECy66C2vfrJQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
