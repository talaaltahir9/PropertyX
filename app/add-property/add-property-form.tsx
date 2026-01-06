'use client';

import { useActionState } from 'react';
import { createProperty } from '@/app/actions/property';

const initialState = {
    error: '',
    message: ''
};

export default function AddPropertyForm() {
    const [state, formAction, isPending] = useActionState(createProperty, initialState);

    return (
        <form action={formAction} className="space-y-6">
            {state?.error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm mb-6">
                    {state.error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                    <input name="title" required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="e.g. Modern Apartment in Downtown" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input name="price" required type="number" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="e.g. 450000" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black">
                        <option value="Sale">Sale</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input name="location" required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="e.g. Faisalabad, PK" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="type" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black">
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Plot">Plot</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input name="bedrooms" type="number" step="1" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="e.g. 2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input name="bathrooms" type="number" step="1" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="e.g. 2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft.)</label>
                    <input name="area" required type="number" min="0" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="e.g. 1200" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="Describe the property..."></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input name="imageUrl" required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-black" placeholder="https://..." />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Creating...' : 'Create Listing'}
                </button>
            </div>
        </form>
    );
}
