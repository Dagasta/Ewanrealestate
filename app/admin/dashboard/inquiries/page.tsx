'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { FaHome, FaEnvelope, FaSignOutAlt } from 'react-icons/fa'
import type { Inquiry } from '@/lib/supabase'
import styles from '../properties/page.module.css'
import dashStyles from '../page.module.css'

export default function InquiriesPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [inquiries, setInquiries] = useState<Inquiry[]>([])

    useEffect(() => {
        checkAuth()
        fetchInquiries()
    }, [])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
        }
        setLoading(false)
    }

    const fetchInquiries = async () => {
        const { data } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setInquiries(data)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return <div className={dashStyles.loading}>Loading...</div>
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className={dashStyles.container}>
            <aside className={dashStyles.sidebar}>
                <div className={dashStyles.logo}>
                    <h2>Admin Panel</h2>
                    <p>Abdalla Alowais</p>
                </div>

                <nav className={dashStyles.nav}>
                    <Link href="/admin/dashboard" className={dashStyles.navItem}>
                        <FaHome /> Dashboard
                    </Link>
                    <Link href="/admin/dashboard/properties" className={dashStyles.navItem}>
                        <FaHome /> Properties
                    </Link>
                    <Link href="/admin/dashboard/inquiries" className={dashStyles.navItemActive}>
                        <FaEnvelope /> Inquiries
                    </Link>
                </nav>

                <div className={dashStyles.sidebarFooter}>
                    <button onClick={handleLogout} className={dashStyles.logoutBtn}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            <main className={dashStyles.main}>
                <div className={dashStyles.header}>
                    <div>
                        <h1>Customer Inquiries</h1>
                        <p>View and manage customer messages</p>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                                        No inquiries yet.
                                    </td>
                                </tr>
                            ) : (
                                inquiries.map((inquiry) => (
                                    <tr key={inquiry.id}>
                                        <td>{inquiry.name}</td>
                                        <td>
                                            <a href={`mailto:${inquiry.email}`} style={{ color: 'var(--primary)' }}>
                                                {inquiry.email}
                                            </a>
                                        </td>
                                        <td>
                                            <a href={`tel:${inquiry.phone}`} style={{ color: 'var(--primary)' }}>
                                                {inquiry.phone}
                                            </a>
                                        </td>
                                        <td style={{ maxWidth: '300px' }}>
                                            {inquiry.message.substring(0, 100)}
                                            {inquiry.message.length > 100 ? '...' : ''}
                                        </td>
                                        <td style={{ whiteSpace: 'nowrap' }}>{formatDate(inquiry.created_at)}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[inquiry.status]}`}>
                                                {inquiry.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
