import { z } from 'zod'

// Property validation schema
export const propertySchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    price: z.number().positive('Price must be positive'),
    location: z.string().min(3, 'Location is required'),
    type: z.enum(['buy', 'rent', 'manage']),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().int().min(0),
    area: z.number().positive('Area must be positive'),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    amenities: z.array(z.string()),
    status: z.enum(['available', 'sold', 'rented']).default('available'),
})

// Inquiry validation schema
export const inquirySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Phone number must be at least 8 digits'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    property_id: z.string().optional(),
})

// Admin login validation schema
export const adminLoginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type PropertyInput = z.infer<typeof propertySchema>
export type InquiryInput = z.infer<typeof inquirySchema>
export type AdminLoginInput = z.infer<typeof adminLoginSchema>
