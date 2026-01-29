import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function DELETE() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Missing Supabase credentials' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Get all properties first
        const { data: properties, error: fetchError } = await supabase
            .from('properties')
            .select('*')

        if (fetchError) {
            return NextResponse.json(
                { error: 'Failed to fetch properties', details: fetchError },
                { status: 500 }
            )
        }

        console.log(`Found ${properties?.length || 0} properties to delete`)

        // Delete all properties
        const { error: deleteError } = await supabase
            .from('properties')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000')

        if (deleteError) {
            return NextResponse.json(
                { error: 'Failed to delete properties', details: deleteError },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${properties?.length || 0} properties`,
            deletedCount: properties?.length || 0
        })
    } catch (error: any) {
        console.error('Delete properties error:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        )
    }
}
