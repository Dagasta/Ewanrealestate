import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const bedrooms = searchParams.get('bedrooms')
        const location = searchParams.get('location')
        const search = searchParams.get('search')

        let query = supabase
            .from('properties')
            .select('*')
            .eq('status', 'available')
            .order('created_at', { ascending: false })

        // Apply filters
        if (type && (type === 'buy' || type === 'rent' || type === 'manage')) {
            query = query.eq('type', type)
        }

        if (minPrice) {
            query = query.gte('price', parseFloat(minPrice))
        }

        if (maxPrice) {
            query = query.lte('price', parseFloat(maxPrice))
        }

        if (bedrooms) {
            query = query.eq('bedrooms', parseInt(bedrooms))
        }

        if (location) {
            query = query.ilike('location', `%${location}%`)
        }

        if (search) {
            query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`)
        }

        const { data, error } = await query

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch properties' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Properties fetch error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
