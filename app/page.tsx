import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import FeaturedPropertiesClient from '@/components/FeaturedPropertiesClient'
import Testimonials from '@/components/Testimonials'
import { FaSearch, FaHome, FaHandshake, FaAward, FaUsers } from 'react-icons/fa'
import styles from './page.module.css'



export default function HomePage() {

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroOverlay} />
                    <div className="container">
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>
                                Find Your Dream Property in <span className="text-gradient">Sharjah</span>
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Discover premium apartments, villas, and commercial spaces with Abdalla Alowais Real Estate -
                                Your trusted partner in UAE property market
                            </p>
                            <div className={styles.heroButtons}>
                                <Link href="/properties?type=buy" className="btn btn-primary">
                                    <FaSearch /> Browse Properties
                                </Link>
                                <Link href="/contact" className="btn btn-outline">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className={styles.stats}>
                    <div className="container">
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <FaHome />
                                </div>
                                <div className={styles.statNumber}>500+</div>
                                <div className={styles.statLabel}>Properties Listed</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <FaUsers />
                                </div>
                                <div className={styles.statNumber}>1000+</div>
                                <div className={styles.statLabel}>Happy Clients</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <FaHandshake />
                                </div>
                                <div className={styles.statNumber}>300+</div>
                                <div className={styles.statLabel}>Successful Deals</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    <FaAward />
                                </div>
                                <div className={styles.statNumber}>15+</div>
                                <div className={styles.statLabel}>Years Experience</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Properties */}
                <section className="section">
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <h2>Featured Properties</h2>
                            <p className="text-muted">
                                Explore our handpicked selection of premium properties in Sharjah
                            </p>
                        </div>

                        <FeaturedPropertiesClient />
                        <div className={styles.viewAllButton}>
                            <Link href="/properties" className="btn btn-primary">
                                View All Properties
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <Testimonials />

                {/* Why Choose Us */}
                <section className={`section ${styles.whyChooseUs}`}>
                    <div className="container">
                        <div className={styles.sectionHeader}>
                            <h2>Why Choose Abdalla Alowais Real Estate?</h2>
                            <p className="text-muted">
                                We are committed to providing exceptional service and finding the perfect property for you
                            </p>
                        </div>

                        <div className="grid grid-3">
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>🏆</div>
                                <h3>Expert Guidance</h3>
                                <p>
                                    Our experienced team provides professional advice to help you make informed decisions
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>💎</div>
                                <h3>Premium Properties</h3>
                                <p>
                                    Access to exclusive listings of high-quality properties in prime Sharjah locations
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>⚡</div>
                                <h3>Fast Response</h3>
                                <p>
                                    Quick response times and efficient service to meet your property needs promptly
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>🤝</div>
                                <h3>Trusted Service</h3>
                                <p>
                                    Building long-term relationships based on trust, transparency, and integrity
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>📊</div>
                                <h3>Market Insights</h3>
                                <p>
                                    Stay informed with our deep knowledge of Sharjah's real estate market trends
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>💬</div>
                                <h3>24/7 Support</h3>
                                <p>
                                    Always available to answer your questions and assist with your property journey
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.cta}>
                    <div className="container">
                        <div className={styles.ctaContent}>
                            <h2>Ready to Find Your Dream Property?</h2>
                            <p>
                                Get in touch with us today and let our experts help you find the perfect home or investment
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link href="/properties" className="btn btn-secondary">
                                    Browse Properties
                                </Link>
                                <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}
