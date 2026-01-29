import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', params.id)
            .single()

        if (error || !data) {
            return NextResponse.json(
                { error: 'Property not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Property fetch error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
