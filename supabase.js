import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fsgwxrtavgxllrtijyev.supabase.co';
const SUPABASE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDc1MzQ2MCwiZXhwIjoxOTQwMzI5NDYwfQ.RVn2lYjRu-sXZCTQEyYAygmDSWcL9knq-iUgJGxlw_E';

const supabase = createClient(supabaseUrl, SUPABASE_KEY);

export default supabase;
