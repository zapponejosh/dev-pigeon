import { createClient} from '@supabase/supabase-js';


// client will be used in login/signup functions, set session/auth and data fetching
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);