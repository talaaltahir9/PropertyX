'use server'

import { createClient } from '@/utils/supabase/server'
import { FilterState } from '@/types'

export async function fetchProperties(filters: FilterState) {
    const supabase = await createClient()

    let query = supabase.from('properties').select('*')

    if (filters.location) {
        query = query.or(`location.ilike.%${filters.location}%,city.ilike.%${filters.location}%`)
    }

    if (filters.type !== 'All') {
        query = query.eq('type', filters.type)
    }

    if (filters.status !== 'All') {
        query = query.eq('status', filters.status)
    }

    // Note: bedrooms logic "1+" means >= 1
    if (filters.bedrooms !== 'Any') {
        query = query.gte('bedrooms', filters.bedrooms)
    }

    if (filters.sort) {
        if (filters.sort === 'price_asc') {
            query = query.order('price', { ascending: true })
        } else if (filters.sort === 'price_desc') {
            query = query.order('price', { ascending: false })
        } else if (filters.sort === 'newest') {
            query = query.order('created_at', { ascending: false })
        }
    } else {
        // Default
        query = query.order('created_at', { ascending: false })
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching properties:', error)
        return []
    }

    return data
}
