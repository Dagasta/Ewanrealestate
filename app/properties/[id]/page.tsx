import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import InquiryForm from '@/components/InquiryForm'
import { supabase } from '@/lib/supabase'
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaArrowLeft, FaWhatsapp } from 'react-icons/fa'
import styles from './page.module.css'

async function getProperty(id: string) {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
        return null
    }

    return data
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const property = await getProperty(params.id)

    if (!property) {
        return {
            title: 'Property Not Found',
        }
    }

    return {
        title: `${property.title} | Abdalla Alowais Real Estate`,
        description: property.description.substring(0, 160),
    }
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
    const property = await getProperty(params.id)

    if (!property) {
        notFound()
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const whatsappMessage = encodeURIComponent(
        `Hi! I'm interested in: ${property.title} - ${formatPrice(property.price)}`
    )
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMessage}`

    // Validate image URLs
    const isValidUrl = (url: string) => {
        return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')
    }

    const validImages = property.images?.filter((img: string) => isValidUrl(img)) || []
    const primaryImage = validImages.length > 0 ? validImages[0] : '/images/placeholder-property.jpg'

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <Link href="/properties" className={styles.backLink}>
                        <FaArrowLeft /> Back to Properties
                    </Link>

                    <div className={styles.propertyGrid}>
                        {/* Images Section */}
                        <div className={styles.imagesSection}>
                            <div className={styles.mainImage}>
                                <Image
                                    src={primaryImage}
                                    alt={property.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                    className={styles.image}
                                    priority
                                />
                                <div className={styles.typeBadge}>
                                    {property.type === 'buy' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : 'For Managing'}
                                </div>
                            </div>

                            {validImages.length > 1 && (
                                <div className={styles.thumbnails}>
                                    {validImages.slice(1, 5).map((image: string, index: number) => (
                                        <div key={index} className={styles.thumbnail}>
                                            <Image
                                                src={image}
                                                alt={`${property.title} - Image ${index + 2}`}
                                                fill
                                                sizes="200px"
                                                className={styles.image}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className={styles.detailsSection}>
                            <div className={styles.header}>
                                <h1>{property.title}</h1>
                                <div className={styles.location}>
                                    <FaMapMarkerAlt />
                                    <span>{property.location}</span>
                                </div>
                            </div>

                            <div className={styles.price}>
                                {formatPrice(property.price)}
                                {property.type === 'rent' && <span className={styles.period}>/month</span>}
                            </div>

                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <FaBed />
                                    <div>
                                        <strong>{property.bedrooms}</strong>
                                        <span>Bedrooms</span>
                                    </div>
                                </div>
                                <div className={styles.feature}>
                                    <FaBath />
                                    <div>
                                        <strong>{property.bathrooms}</strong>
                                        <span>Bathrooms</span>
                                    </div>
                                </div>
                                <div className={styles.feature}>
                                    <FaRulerCombined />
                                    <div>
                                        <strong>{property.area}</strong>
                                        <span>sqft</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.description}>
                                <h2>Description</h2>
                                <p>{property.description}</p>
                            </div>

                            {property.amenities && property.amenities.length > 0 && (
                                <div className={styles.amenities}>
                                    <h2>Amenities</h2>
                                    <ul>
                                        {property.amenities.map((amenity: string, index: number) => (
                                            <li key={index}>✓ {amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className={styles.actions}>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    <FaWhatsapp /> Contact via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Form Section */}
                    <div className={styles.inquirySection}>
                        <div className={styles.inquiryCard}>
                            <h2>Interested in this property?</h2>
                            <p className="text-muted mb-3">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                            <InquiryForm propertyId={property.id} propertyTitle={property.title} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}
