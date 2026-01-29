'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { FaHome, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import type { Property } from '@/lib/supabase'
import styles from './page.module.css'
import dashStyles from '../page.module.css'

export default function PropertiesManagementPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [properties, setProperties] = useState<Property[]>([])

    useEffect(() => {
        checkAuth()
        fetchProperties()
    }, [])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin/login')
        }
        setLoading(false)
    }

    const fetchProperties = async () => {
        const { data } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setProperties(data)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property?')) return

        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id)

        if (!error) {
            setProperties(properties.filter(p => p.id !== id))
            alert('Property deleted successfully!')
        } else {
            alert('Failed to delete property')
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return <div className={dashStyles.loading}>Loading...</div>
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
        }).format(price)
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
                    <Link href="/admin/dashboard/properties" className={dashStyles.navItemActive}>
                        <FaHome /> Properties
                    </Link>
                    <Link href="/admin/dashboard/inquiries" className={dashStyles.navItem}>
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
                        <h1>Manage Properties</h1>
                        <p>Add, edit, or remove property listings</p>
                    </div>
                    <Link href="/admin/dashboard/properties/new" className="btn btn-primary">
                        <FaPlus /> Add New Property
                    </Link>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                                        No properties yet. Click "Add New Property" to get started!
                                    </td>
                                </tr>
                            ) : (
                                properties.map((property) => (
                                    <tr key={property.id}>
                                        <td>{property.title}</td>
                                        <td>{property.location}</td>
                                        <td>
                                            <span className={styles.badge}>
                                                {property.type === 'buy' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : 'For Managing'}
                                            </span>
                                        </td>
                                        <td>{formatPrice(property.price)}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[property.status]}`}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <Link
                                                    href={`/admin/dashboard/properties/${property.id}/edit`}
                                                    className={styles.btnEdit}
                                                >
                                                    <FaEdit /> Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(property.id)}
                                                    className={styles.btnDelete}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
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
