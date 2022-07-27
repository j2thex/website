import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// @ts-ignore
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const loginWithProvider = async (provider: string, redirectTo: string) => {
    await supabase.auth.signIn({
        provider: provider as any,
    }, {
        redirectTo,
    });
};

export const supabaseLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    }
};
