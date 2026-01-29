'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './new.module.css'

export default function NewPropertyPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploadingImages, setUploadingImages] = useState(false)
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        type: 'buy' as 'buy' | 'rent' | 'manage',
        bedrooms: '',
        bathrooms: '',
        area: '',
        images: '',
        amenities: '',
        status: 'available' as 'available' | 'sold' | 'rented',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploadingImages(true)
        const uploadedUrls: string[] = []

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const fileExt = file.name.split('.').pop()
                const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
                const filePath = `properties/${fileName}`

                // Upload to Supabase Storage
                const { data, error } = await supabase.storage
                    .from('property-images')
                    .upload(filePath, file)

                if (error) {
                    console.error('Upload error:', error)
                    alert(`Failed to upload ${file.name}`)
                    continue
                }

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath)

                uploadedUrls.push(publicUrl)
            }

            // Add uploaded URLs to the form
            setUploadedImageUrls(prev => [...prev, ...uploadedUrls])
            const currentImages = formData.images ? formData.images.split('\n').filter(url => url.trim()) : []
            const allImages = [...currentImages, ...uploadedUrls]
            setFormData(prev => ({
                ...prev,
                images: allImages.join('\n')
            }))

            alert(`Successfully uploaded ${uploadedUrls.length} image(s)!`)
        } catch (error: any) {
            alert('Error uploading images: ' + error.message)
        } finally {
            setUploadingImages(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const propertyData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                location: formData.location,
                type: formData.type,
                bedrooms: parseInt(formData.bedrooms),
                bathrooms: parseInt(formData.bathrooms),
                area: parseFloat(formData.area),
                images: formData.images.split('\n').filter(url => url.trim()),
                amenities: formData.amenities.split('\n').filter(a => a.trim()),
                status: formData.status,
            }

            const { error } = await supabase
                .from('properties')
                .insert([propertyData])

            if (error) throw error

            alert('Property added successfully!')
            router.push('/admin/dashboard/properties')
        } catch (error: any) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/admin/dashboard/properties" className={styles.backLink}>
                    <FaArrowLeft /> Back to Properties
                </Link>
                <h1>Add New Property</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Property Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="e.g., Luxury 3BR Apartment in Al Majaz"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location" className="form-label">Location *</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="e.g., Al Majaz, Sharjah"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type" className="form-label">Property Type *</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="buy">For Sale</option>
                            <option value="rent">For Rent</option>
                            <option value="manage">For Managing</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price (AED) *</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="e.g., 850000"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bedrooms" className="form-label">Bedrooms *</label>
                        <input
                            type="number"
                            id="bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="form-input"
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bathrooms" className="form-label">Bathrooms *</label>
                        <input
                            type="number"
                            id="bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="form-input"
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="area" className="form-label">Area (sqft) *</label>
                        <input
                            type="number"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="e.g., 1500"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status *</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-textarea"
                        required
                        rows={6}
                        placeholder="Detailed property description..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images" className="form-label">Property Images *</label>

                    {/* File Upload Button */}
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="file"
                            id="imageFiles"
                            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                            multiple
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        <label
                            htmlFor="imageFiles"
                            className="btn btn-outline"
                            style={{
                                cursor: uploadingImages ? 'not-allowed' : 'pointer',
                                opacity: uploadingImages ? 0.6 : 1,
                                display: 'inline-block'
                            }}
                        >
                            {uploadingImages ? 'Uploading...' : '📁 Upload Images from Computer'}
                        </label>
                        {uploadedImageUrls.length > 0 && (
                            <small style={{ marginLeft: '1rem', color: 'var(--success)' }}>
                                ✓ {uploadedImageUrls.length} image(s) uploaded
                            </small>
                        )}
                    </div>

                    {/* Manual URL Input */}
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>
                        Or paste image URLs (one per line):
                    </label>
                    <textarea
                        id="images"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        className="form-textarea"
                        required
                        rows={5}
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                    />
                    <small style={{ color: 'var(--text-muted)', marginTop: '0.5rem', display: 'block' }}>
                        Upload images from your computer or paste URLs. At least one image is required.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="amenities" className="form-label">Amenities (one per line)</label>
                    <textarea
                        id="amenities"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        className="form-textarea"
                        rows={5}
                        placeholder="Swimming Pool&#10;Gym&#10;Parking&#10;24/7 Security"
                    />
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/dashboard/properties" className="btn btn-outline">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Adding Property...' : 'Add Property'}
                    </button>
                </div>
            </form>
        </div>
    )
}
