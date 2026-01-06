"use client";

import { FilterState } from "@/types";
import { Search } from 'lucide-react';

interface FilterBarProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    onSearch: () => void;
}

export default function FilterBar({ filters, setFilters, onSearch }: FilterBarProps) {
    const handleChange = (key: keyof FilterState, value: any) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 -mt-10 relative z-20 border border-gray-100/50">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Location Input */}
                <div className="md:col-span-4 relative group">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block group-focus-within:text-indigo-600 transition">Location</label>
                    <input
                        type="text"
                        placeholder="City, Neighborhood, or Zip"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400"
                        value={filters.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                    />
                </div>

                {/* Type Select */}
                <div className="md:col-span-2 relative group">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block group-focus-within:text-indigo-600 transition">Type</label>
                    <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900 appearance-none cursor-pointer"
                        value={filters.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                    >
                        <option value="All">Any Type</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Plot">Plot</option>
                    </select>
                </div>

                {/* Status Select */}
                <div className="md:col-span-2 relative group">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block group-focus-within:text-indigo-600 transition">Status</label>
                    <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900 appearance-none cursor-pointer"
                        value={filters.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option value="All">Any Status</option>
                        <option value="Rent">Rent</option>
                        <option value="Sale">Sale</option>
                    </select>
                </div>

                {/* Bedrooms Select */}
                <div className="md:col-span-2 relative group">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block group-focus-within:text-indigo-600 transition">Beds</label>
                    <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-900 appearance-none cursor-pointer"
                        value={filters.bedrooms}
                        onChange={(e) => handleChange('bedrooms', e.target.value === 'Any' ? 'Any' : Number(e.target.value))}
                    >
                        <option value="Any">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                    </select>
                </div>

                {/* Search Button */}
                <div className="md:col-span-2 flex items-end">
                    <button
                        onClick={onSearch}
                        className="w-full bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 active:scale-95 transition flex items-center justify-center gap-2 font-semibold shadow-lg shadow-indigo-500/30"
                    >
                        <Search size={18} />
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
