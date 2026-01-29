'use client'

import { FaWhatsapp } from 'react-icons/fa'
import styles from './WhatsAppButton.module.css'

export default function WhatsAppButton() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971XXXXXXXXX'
    const message = encodeURIComponent('Hello! I would like to inquire about your properties.')
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
            aria-label="Contact us on WhatsApp"
        >
            <FaWhatsapp />
        </a>
    )
}
