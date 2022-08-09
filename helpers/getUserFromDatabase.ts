import { supabase } from '../lib/SupabaseConnector';

export async function getUserFromDatabase(uid: string) {
    // TODO: make foreign key relations and fetch all data related to user in one call
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', uid)
        .single();

    if (error) {
        throw error;
    }

    return data;
}
