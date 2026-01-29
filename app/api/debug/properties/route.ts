import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    try {
        // Get all properties without any filters
        const { data, error, count } = await supabase
            .from('properties')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({
                success: false,
                error: error.message,
                details: error
            }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            count: count,
            properties: data,
            message: `Found ${count} total properties in database`
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
