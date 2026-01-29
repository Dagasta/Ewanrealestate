'use client'

import { useEffect, useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { supabase } from '@/lib/supabase'
import type { Property } from '@/lib/supabase'

export default function FeaturedPropertiesClient() {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch initial properties
        fetchProperties()

        // Set up real-time subscription
        const channel = supabase
            .channel('properties-changes')
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
                    schema: 'public',
                    table: 'properties',
                    filter: 'status=eq.available'
                },
                (payload) => {
                    console.log('Property change detected:', payload)

                    if (payload.eventType === 'INSERT') {
                        // Add new property to the list
                        setProperties(prev => [payload.new as Property, ...prev].slice(0, 6))
                    } else if (payload.eventType === 'UPDATE') {
                        // Update existing property
                        setProperties(prev =>
                            prev.map(p => p.id === payload.new.id ? payload.new as Property : p)
                        )
                    } else if (payload.eventType === 'DELETE') {
                        // Remove deleted property
                        setProperties(prev => prev.filter(p => p.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const fetchProperties = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('properties')
            .select('*')
            .eq('status', 'available')
            .order('created_at', { ascending: false })
            .limit(6)

        if (data) {
            setProperties(data)
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="loading"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading properties...</p>
            </div>
        )
    }

    if (properties.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p>No properties available at the moment. Check back soon!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-3">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    )
}
