'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa'
import type { Property } from '@/lib/supabase'
import styles from './PropertyCard.module.css'

interface PropertyCardProps {
    property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
        }).format(price)
    }


    // Validate image URL
    const isValidUrl = (url: string) => {
        return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')
    }

    const primaryImage = property.images && property.images.length > 0 && isValidUrl(property.images[0])
        ? property.images[0]
        : '/images/placeholder-property.jpg'

    return (
        <Link href={`/properties/${property.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={primaryImage}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                />
                <div className={styles.badge}>
                    {property.type === 'buy' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : 'For Managing'}
                </div>
                {property.status !== 'available' && (
                    <div className={styles.statusBadge}>
                        {property.status === 'sold' ? 'Sold' : 'Rented'}
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{property.title}</h3>

                <div className={styles.location}>
                    <FaMapMarkerAlt />
                    <span>{property.location}</span>
                </div>

                <p className={styles.description}>
                    {property.description.substring(0, 100)}
                    {property.description.length > 100 ? '...' : ''}
                </p>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <FaBed />
                        <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className={styles.feature}>
                        <FaBath />
                        <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className={styles.feature}>
                        <FaRulerCombined />
                        <span>{property.area} sqft</span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.price}>
                        {formatPrice(property.price)}
                        {property.type === 'rent' && <span className={styles.period}>/month</span>}
                    </div>
                    <div className={styles.viewButton}>View Details</div>
                </div>
            </div>
        </Link>
    )
}
