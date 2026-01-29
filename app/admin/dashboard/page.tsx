'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { FaHome, FaEnvelope, FaSignOutAlt, FaPlus } from 'react-icons/fa'
import styles from './page.module.css'

export default function AdminDashboardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalProperties: 0,
        availableProperties: 0,
        totalInquiries: 0,
        newInquiries: 0,
    })

    useEffect(() => {
        checkAuth()
        fetchStats()
    }, [])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
        }
        setLoading(false)
    }

    const fetchStats = async () => {
        try {
            // Fetch properties stats
            const { data: allProperties } = await supabase
                .from('properties')
                .select('status')

            const { data: availableProperties } = await supabase
                .from('properties')
                .select('id')
                .eq('status', 'available')

            // Fetch inquiries stats
            const { data: allInquiries } = await supabase
                .from('inquiries')
                .select('status')

            const { data: newInquiries } = await supabase
                .from('inquiries')
                .select('id')
                .eq('status', 'new')

            setStats({
                totalProperties: allProperties?.length || 0,
                availableProperties: availableProperties?.length || 0,
                totalInquiries: allInquiries?.length || 0,
                newInquiries: newInquiries?.length || 0,
            })
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return <div className={styles.loading}>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h2>Admin Panel</h2>
                    <p>Abdalla Alowais</p>
                </div>

                <nav className={styles.nav}>
                    <Link href="/admin/dashboard" className={styles.navItemActive}>
                        <FaHome /> Dashboard
                    </Link>
                    <Link href="/admin/dashboard/properties" className={styles.navItem}>
                        <FaHome /> Properties
                    </Link>
                    <Link href="/admin/dashboard/inquiries" className={styles.navItem}>
                        <FaEnvelope /> Inquiries
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            <main className={styles.main}>
                <div className={styles.header}>
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back! Here's your overview.</p>
                    </div>
                    <Link href="/admin/dashboard/properties/new" className="btn btn-primary">
                        <FaPlus /> Add Property
                    </Link>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: '#3b82f6' }}>
                            <FaHome />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>{stats.totalProperties}</div>
                            <div className={styles.statLabel}>Total Properties</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: '#10b981' }}>
                            <FaHome />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>{stats.availableProperties}</div>
                            <div className={styles.statLabel}>Available Properties</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: '#f59e0b' }}>
                            <FaEnvelope />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>{stats.totalInquiries}</div>
                            <div className={styles.statLabel}>Total Inquiries</div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: '#ef4444' }}>
                            <FaEnvelope />
                        </div>
                        <div className={styles.statContent}>
                            <div className={styles.statNumber}>{stats.newInquiries}</div>
                            <div className={styles.statLabel}>New Inquiries</div>
                        </div>
                    </div>
                </div>

                <div className={styles.quickActions}>
                    <h2>Quick Actions</h2>
                    <div className={styles.actionsGrid}>
                        <Link href="/admin/dashboard/properties/new" className={styles.actionCard}>
                            <FaPlus />
                            <span>Add New Property</span>
                        </Link>
                        <Link href="/admin/dashboard/properties" className={styles.actionCard}>
                            <FaHome />
                            <span>Manage Properties</span>
                        </Link>
                        <Link href="/admin/dashboard/inquiries" className={styles.actionCard}>
                            <FaEnvelope />
                            <span>View Inquiries</span>
                        </Link>
                        <a href="/" target="_blank" className={styles.actionCard}>
                            <FaHome />
                            <span>View Website</span>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}
