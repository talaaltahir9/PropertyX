import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { getFavorites } from '@/app/actions/favorites';
import { Property } from '@/types';

export default async function FavoritesPage() {
    const favorites = (await getFavorites()) as Property[];

    return (
        <div className="bg-gray-50 min-h-screen pb-20 pt-10">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Saved Properties</h1>
                <p className="text-gray-500 mb-8">View and manage your favorite listings.</p>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favorites.map(prop => (
                            <PropertyCard key={prop.id} property={prop} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-lg mb-6">You haven't saved any properties yet.</p>
                        <Link href="/properties" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                            Browse Properties
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
