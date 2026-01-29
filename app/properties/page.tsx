'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PropertyCard from '@/components/PropertyCard'
import type { Property } from '@/lib/supabase'
import { FaFilter } from 'react-icons/fa'
import styles from './page.module.css'

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        search: '',
    })

    useEffect(() => {
        fetchProperties()
    }, [filters])

    const fetchProperties = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (filters.type) params.append('type', filters.type)
            if (filters.minPrice) params.append('minPrice', filters.minPrice)
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
            if (filters.bedrooms) params.append('bedrooms', filters.bedrooms)
            if (filters.search) params.append('search', filters.search)

            const response = await fetch(`/api/properties?${params.toString()}`)
            const data = await response.json()

            if (data.success) {
                setProperties(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch properties:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.pageHeader}>
                    <div className="container">
                        <h1>Browse Properties</h1>
                        <p>Find your perfect property in Sharjah</p>
                    </div>
                </div>

                <div className="container">
                    <div className={styles.filtersSection}>
                        <div className={styles.filtersHeader}>
                            <FaFilter /> <span>Filter Properties</span>
                        </div>
                        <div className={styles.filters}>
                            <div className={styles.filterGroup}>
                                <label htmlFor="search">Search</label>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Search by title, location..."
                                    className="form-input"
                                />
                            </div>

                            <div className={styles.filterGroup}>
                                <label htmlFor="type">Property Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                    className="form-select"
                                >
                                    <option value="">All Types</option>
                                    <option value="buy">For Sale</option>
                                    <option value="rent">For Rent</option>
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label htmlFor="bedrooms">Bedrooms</label>
                                <select
                                    id="bedrooms"
                                    name="bedrooms"
                                    value={filters.bedrooms}
                                    onChange={handleFilterChange}
                                    className="form-select"
                                >
                                    <option value="">Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label htmlFor="minPrice">Min Price (AED)</label>
                                <input
                                    type="number"
                                    id="minPrice"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Min"
                                    className="form-input"
                                />
                            </div>

                            <div className={styles.filterGroup}>
                                <label htmlFor="maxPrice">Max Price (AED)</label>
                                <input
                                    type="number"
                                    id="maxPrice"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    placeholder="Max"
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.resultsSection}>
                        <div className={styles.resultsHeader}>
                            <h2>
                                {loading ? 'Loading...' : `${properties.length} Properties Found`}
                            </h2>
                        </div>

                        {loading ? (
                            <div className={styles.loadingState}>
                                <div className="loading"></div>
                                <p>Loading properties...</p>
                            </div>
                        ) : properties.length > 0 ? (
                            <div className="grid grid-3">
                                {properties.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResults}>
                                <p>No properties found matching your criteria.</p>
                                <p className="text-muted">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}
