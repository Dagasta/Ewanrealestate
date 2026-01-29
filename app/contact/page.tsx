import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import InquiryForm from '@/components/InquiryForm'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import styles from './page.module.css'

export const metadata = {
    title: 'Contact Us | Abdalla Alowais Real Estate',
    description: 'Get in touch with Abdalla Alowais Real Estate. We are here to help you find your dream property in Sharjah, UAE.',
}

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.pageHeader}>
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p>We're here to help you find your perfect property</p>
                    </div>
                </div>

                <div className="container">
                    <div className={styles.contactGrid}>
                        {/* Contact Information */}
                        <div className={styles.contactInfo}>
                            <h2>Get In Touch</h2>
                            <p className="text-muted mb-3">
                                Have a question or ready to find your dream property?
                                Reach out to us and we'll get back to you as soon as possible.
                            </p>

                            <div className={styles.contactCards}>
                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h3>Visit Us</h3>
                                        <p>Sharjah, United Arab Emirates</p>
                                    </div>
                                </div>

                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>
                                        <FaPhone />
                                    </div>
                                    <div>
                                        <h3>Call Us</h3>
                                        <p>
                                            <a href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>
                                                +971 XX XXX XXXX
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <h3>Email Us</h3>
                                        <p>
                                            <a href="mailto:info@abdallaowais.com">
                                                info@abdallaowais.com
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>
                                        <FaWhatsapp />
                                    </div>
                                    <div>
                                        <h3>WhatsApp</h3>
                                        <p>
                                            <a
                                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Chat with us
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.businessHours}>
                                <h3>Business Hours</h3>
                                <div className={styles.hoursGrid}>
                                    <div>
                                        <strong>Saturday - Thursday</strong>
                                        <p>9:00 AM - 6:00 PM</p>
                                    </div>
                                    <div>
                                        <strong>Friday</strong>
                                        <p>Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <div className={styles.formCard}>
                                <h2>Send Us a Message</h2>
                                <p className="text-muted mb-3">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>
                                <InquiryForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}
