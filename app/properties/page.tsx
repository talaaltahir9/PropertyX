
"use client";

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import FilterBar from '@/components/FilterBar';
import { FilterState, Property } from '@/types';
import { fetchProperties } from '@/app/actions/fetch';

export default function PropertiesPage() {
    const [filters, setFilters] = useState<FilterState>({
        location: '',
        minPrice: null,
        maxPrice: null,
        type: 'All',
        status: 'All',
        bedrooms: 'Any'
    });

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    // Initial Fetch
    useEffect(() => {
        handleSearch();
    }, []); // Run once on mount

    const handleSearch = async () => {
        setLoading(true);
        const data = await fetchProperties(filters);
        setProperties(data as Property[]);
        setLoading(false);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-indigo-900 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Property</h1>
                    <p className="text-indigo-200 text-lg">Search through our exclusive listings</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    onSearch={handleSearch}
                />

                {/* Results */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Properties <span className="text-gray-400 font-normal text-lg ml-2">({properties.length} results)</span>
                        </h2>
                        <select
                            onChange={(e) => {
                                setFilters({ ...filters, sort: e.target.value });
                                // Trigger fetch immediately works if we add dependency, 
                                // but our effect only runs on mount currently!
                                // We need to trigger search when filters change or manually.
                                // Let's call handleSearch with new filters manually for now to avoid rapid effect firing if we typed logic.
                                // Actually, better to just update filters and let a useEffect watch filters? 
                                // For now, explicit call:
                                const newFilters = { ...filters, sort: e.target.value };
                                (async () => {
                                    setLoading(true);
                                    const data = await fetchProperties(newFilters);
                                    setProperties(data as Property[]);
                                    setLoading(false);
                                })();
                            }}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                            <option value="newest">Sort by: Newest</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.map(prop => (
                                <PropertyCard key={prop.id} property={prop} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                            <button
                                onClick={async () => {
                                    const resetFilters: FilterState = { location: '', minPrice: null, maxPrice: null, type: 'All', status: 'All', bedrooms: 'Any' };
                                    setFilters(resetFilters);
                                    setLoading(true);
                                    const data = await fetchProperties(resetFilters);
                                    setProperties(data as Property[]);
                                    setLoading(false);
                                }}
                                className="mt-4 text-indigo-600 font-semibold hover:text-indigo-800"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
