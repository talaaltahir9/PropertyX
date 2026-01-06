'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleFavorite(propertyId: number) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Must be logged in' }
    }

    // Check if exists
    const { data: existing } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('property_id', propertyId)
        .single()

    if (existing) {
        // Remove
        await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('property_id', propertyId)
    } else {
        // Add
        await supabase
            .from('favorites')
            .insert({
                user_id: user.id,
                property_id: propertyId
            })
    }

    revalidatePath('/favorites')
    revalidatePath(`/property/${propertyId}`)
    return { success: true }
}

export async function getFavorites() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data } = await supabase
        .from('favorites')
        .select('property_id, properties(*)')
        .eq('user_id', user.id)

    // Supabase might return properties as an array or object depending on relationship.
    // We cast to any to avoid complex type gymnastics for this rapid prototype.
    return data?.map((f: any) => f.properties).flat() || []
}
