import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { sendInquiryEmail } from '@/lib/email'
import { sendWhatsAppNotification } from '@/lib/whatsapp'
import { inquirySchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate request body
        const validatedData = inquirySchema.parse(body)

        // Insert inquiry into database
        const { data: inquiry, error: dbError } = await supabaseAdmin
            .from('inquiries')
            .insert([validatedData])
            .select()
            .single()

        if (dbError) {
            console.error('Database error:', dbError)
            return NextResponse.json(
                { error: 'Failed to save inquiry' },
                { status: 500 }
            )
        }

        // Get property title if property_id is provided
        let propertyTitle = undefined
        if (validatedData.property_id) {
            const { data: property } = await supabaseAdmin
                .from('properties')
                .select('title')
                .eq('id', validatedData.property_id)
                .single()

            propertyTitle = property?.title
        }

        // Send email notification
        await sendInquiryEmail({
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            message: validatedData.message,
            propertyTitle,
        })

        // Send WhatsApp notification (NEW!)
        await sendWhatsAppNotification({
            customerName: validatedData.name,
            customerPhone: validatedData.phone,
            customerEmail: validatedData.email,
            propertyTitle,
            message: validatedData.message,
            timestamp: new Date().toLocaleString('en-AE', {
                timeZone: 'Asia/Dubai',
                dateStyle: 'medium',
                timeStyle: 'short'
            })
        })

        return NextResponse.json({ success: true, data: inquiry })
    } catch (error: any) {
        console.error('Inquiry submission error:', error)
        return NextResponse.json(
            { error: error.message || 'Invalid request' },
            { status: 400 }
        )
    }
}
