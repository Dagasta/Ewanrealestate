interface InquiryEmailData {
  name: string
  email: string
  phone: string
  message: string
  propertyTitle?: string
}

export async function sendInquiryEmail(data: InquiryEmailData) {
  // Email functionality removed - Resend API not needed
  // Inquiry is already saved to Supabase database
  console.log('New inquiry received:', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    property: data.propertyTitle || 'General inquiry',
    message: data.message
  })

  return { success: true }
}
