'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProperty(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const title = formData.get('title') as string
    const price = Number(formData.get('price'))
    const status = formData.get('status') as string
    const location = formData.get('location') as string
    const city = location.split(',')[0].trim() // Simple logic to extract city
    const type = formData.get('type') as string
    const bedrooms = Number(formData.get('bedrooms'))
    const bathrooms = Number(formData.get('bathrooms'))
    const area = Number(formData.get('area'))
    const description = formData.get('description') as string
    const imageUrl = formData.get('imageUrl') as string

    // Validate inputs (basic)
    if (!title || !price || !location || !type) {
        return { error: 'Missing required fields' }
    }

    // Create property object
    const { error } = await supabase.from('properties').insert({
        title,
        price,
        status,
        location,
        city,
        type,
        bedrooms,
        bathrooms,
        area,
        description,
        images: [imageUrl], // Storing as array for future multiple images
        user_id: user.id
    })

    if (error) {
        console.error('Error creating property:', error)
        return { error: 'Failed to create listing' }
    }

    revalidatePath('/')
    revalidatePath('/properties')
    redirect('/properties?newItem=true')
}
