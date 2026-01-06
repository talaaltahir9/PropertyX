
import { createClient } from './supabase/client';

async function checkLatestProperty() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('properties')
        .select('id, title, area, created_at')
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error fetching property:', error);
    } else {
        console.log('Latest Property:', data);
    }
}

checkLatestProperty();
