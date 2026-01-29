import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Abdalla Alowais Real Estate | Premium Properties in Sharjah, UAE',
    description: 'Discover your dream property in Sharjah with Abdalla Alowais Real Estate. Browse luxury apartments, villas, and commercial spaces for sale and rent. Expert guidance, premium listings, and trusted service in the UAE real estate market.',
    keywords: 'real estate Sharjah, properties UAE, apartments for sale Sharjah, villas for rent Sharjah, Abdalla Alowais, UAE real estate, Sharjah properties, luxury apartments UAE, commercial spaces Sharjah, property investment UAE',
    authors: [{ name: 'Abdalla Alowais Real Estate' }],
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#0047FF',
    openGraph: {
        title: 'Abdalla Alowais Real Estate | Premium Properties in Sharjah',
        description: 'Your trusted real estate partner in Sharjah, UAE. Find luxury apartments, villas, and commercial spaces.',
        type: 'website',
        locale: 'en_AE',
        siteName: 'Abdalla Alowais Real Estate',
        images: [
            {
                url: '/office-photo.jpg',
                width: 1200,
                height: 630,
                alt: 'Abdalla Alowais Real Estate Office in Sharjah',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Abdalla Alowais Real Estate | Premium Properties in Sharjah',
        description: 'Your trusted real estate partner in Sharjah, UAE',
        images: ['/office-photo.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'Abdalla Alowais Real Estate',
        description: 'Premium real estate services in Sharjah, UAE',
        url: 'https://abdalla-owais-real-estate.vercel.app',
        telephone: '+971506593339',
        email: 'aalowaisrealestate@gmail.com',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sharjah',
            addressCountry: 'AE',
        },
        areaServed: {
            '@type': 'City',
            name: 'Sharjah',
        },
        priceRange: '$$',
        image: 'https://abdalla-owais-real-estate.vercel.app/office-photo.jpg',
        sameAs: [
            'https://facebook.com',
            'https://instagram.com',
            'https://linkedin.com',
        ],
    }

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://abdalla-owais-real-estate.vercel.app" />
                <meta name="geo.region" content="AE-SH" />
                <meta name="geo.placename" content="Sharjah" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
