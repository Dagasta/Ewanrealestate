'use client'

import { useState } from 'react'
import { inquirySchema, type InquiryInput } from '@/lib/validations'
import styles from './InquiryForm.module.css'

interface InquiryFormProps {
    propertyId?: string
    propertyTitle?: string
}

export default function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: propertyTitle ? `I'm interested in: ${propertyTitle}` : '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            // Validate form data
            const validatedData: InquiryInput = {
                ...formData,
                property_id: propertyId,
            }

            inquirySchema.parse(validatedData)

            // Submit to API
            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validatedData),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to submit inquiry')
            }

            setSuccess(true)
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            })
        } catch (err: any) {
            // Handle Zod validation errors
            if (err.errors && Array.isArray(err.errors)) {
                const firstError = err.errors[0]
                setError(firstError.message || 'Please check your input and try again.')
            } else {
                setError(err.message || 'Something went wrong. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {success && (
                <div className={styles.successMessage}>
                    Thank you! Your inquiry has been submitted successfully. We'll contact you soon.
                </div>
            )}

            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                    disabled={loading}
                    placeholder="+971 XX XXX XXXX"
                />
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    required
                    disabled={loading}
                    rows={5}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
            >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
        </form>
    )
}
