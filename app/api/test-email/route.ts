import { NextResponse } from 'next/server'
import { sendInquiryEmail } from '@/lib/email'

export async function GET() {
    try {
        // Send a test email
        const result = await sendInquiryEmail({
            name: 'Test Customer',
            email: 'test@example.com',
            phone: '+971 50 123 4567',
            message: 'This is a test inquiry to verify the email notification system is working.',
            propertyTitle: 'Test Property - Luxury 3BR Apartment'
        })

        return NextResponse.json({
            success: true,
            message: 'Test email sent!',
            result: result
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            details: error
        }, { status: 500 })
    }
}
