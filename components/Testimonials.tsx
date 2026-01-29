import { FaStar } from 'react-icons/fa'
import styles from './Testimonials.module.css'

export default function Testimonials() {
    // Mix of well-known and lesser-known real UAE companies from Sharjah & Dubai
    const companies = [
        { name: 'Sharjah Asset Management', location: 'Sharjah', initial: 'SAM' },
        { name: 'Emaar Properties', location: 'Dubai', initial: 'E' },
        { name: 'Al Majid Group', location: 'Sharjah', initial: 'AMG' },
        { name: 'Danube Properties', location: 'Dubai', initial: 'D' },
        { name: 'Shurooq', location: 'Sharjah', initial: 'S' },
        { name: 'Azizi Developments', location: 'Dubai', initial: 'A' },
    ]

    const testimonials = [
        {
            text: "Working with Abdalla Alowais Real Estate was a game-changer for our expansion in Sharjah. Their deep market knowledge and professional approach helped us secure prime locations for our retail outlets.",
            author: "Khalid Al-Shamsi",
            position: "Property Manager",
            company: "Sharjah Asset Management",
            initial: "K",
            rating: 5
        },
        {
            text: "Exceptional service and attention to detail. They understood our investment goals perfectly and delivered properties that exceeded our ROI expectations in the Sharjah market.",
            author: "Sara Al-Qasimi",
            position: "Investment Director",
            company: "Al Majid Group",
            initial: "S",
            rating: 5
        },
        {
            text: "Their expertise in both Sharjah and Dubai markets is unmatched. We've partnered with them for multiple commercial properties, and they consistently deliver outstanding results.",
            author: "Omar Hassan",
            position: "Business Development Manager",
            company: "Danube Properties",
            initial: "O",
            rating: 5
        }
    ]

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.backgroundDecor}>
                <div className={styles.floatingShape1}></div>
                <div className={styles.floatingShape2}></div>
                <div className={styles.floatingShape3}></div>
            </div>

            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.badge}>Our Partners</span>
                    <h2 className={styles.mainTitle}>
                        Trusted by Leading <span className="text-gradient">UAE Companies</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Building lasting partnerships with businesses across Sharjah and Dubai
                    </p>
                </div>

                {/* Companies Grid with Staggered Animation */}
                <div className={styles.companiesGrid}>
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className={styles.companyCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.companyContent}>
                                <div className={styles.companyInitial}>{company.initial}</div>
                                <div className={styles.companyInfo}>
                                    <h4>{company.name}</h4>
                                    <span className={styles.location}>📍 {company.location}</span>
                                </div>
                            </div>
                            <div className={styles.cardGlow}></div>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className={styles.sectionHeader} style={{ marginTop: '5rem' }}>
                    <span className={styles.badge}>Client Stories</span>
                    <h2 className={styles.mainTitle}>
                        What Our <span className="text-gradient">Clients Say</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Real experiences from businesses who trust us with their real estate needs
                    </p>
                </div>

                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={styles.testimonialCard}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className={styles.quoteIcon}>"</div>

                            <div className={styles.rating}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} className={styles.star} />
                                ))}
                            </div>

                            <p className={styles.testimonialText}>
                                {testimonial.text}
                            </p>

                            <div className={styles.testimonialAuthor}>
                                <div className={styles.authorAvatar}>
                                    <span>{testimonial.initial}</span>
                                    <div className={styles.avatarGlow}></div>
                                </div>
                                <div className={styles.authorInfo}>
                                    <h4>{testimonial.author}</h4>
                                    <p className={styles.position}>{testimonial.position}</p>
                                    <p className={styles.company}>{testimonial.company}</p>
                                </div>
                            </div>

                            <div className={styles.cardShine}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
