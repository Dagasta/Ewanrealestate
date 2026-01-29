import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Property {
    id: string
    title: string
    description: string
    price: number
    location: string
    type: 'buy' | 'rent' | 'manage'
    bedrooms: number
    bathrooms: number
    area: number
    images: string[]
    amenities: string[]
    status: 'available' | 'sold' | 'rented'
    created_at: string
    updated_at: string
}

export interface Inquiry {
    id: string
    name: string
    email: string
    phone: string
    message: string
    property_id?: string
    status: 'new' | 'contacted' | 'closed'
    created_at: string
}
