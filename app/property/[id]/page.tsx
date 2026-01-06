import Link from 'next/link';
import { MapPin, Bed, Bath, ArrowLeft, Heart, Share2, Check } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import SaveButton from '@/components/SaveButton';

export default async function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
                <p className="text-gray-500 mb-8">The property you are looking for does not exist or has been removed.</p>
                <Link href="/properties" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Browse Properties
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Image Gallery (Placeholder for now) */}
            <div className="h-[60vh] bg-gray-900 relative">
                <div
                    className="w-full h-full bg-cover bg-center opacity-80"
                    style={{ backgroundImage: `url(${property.images[0]})` }}
                />
                <div className="absolute top-24 left-0 right-0 max-w-7xl mx-auto px-6">
                    <Link href="/properties" className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full transition text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Search
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
                    {/* Main Info */}
                    <div className="lg:col-span-2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${property.status === 'Rent' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    For {property.status}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                <div className="flex items-center text-gray-500 text-lg">
                                    <MapPin size={20} className="mr-2 text-indigo-500" />
                                    {property.location}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-8 border-y border-gray-100 py-8 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-50 p-3 rounded-full text-indigo-600">
                                    <Bed size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">Bedrooms</p>
                                    <p className="text-xl font-bold text-gray-900">{property.bedrooms}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-50 p-3 rounded-full text-indigo-600">
                                    <Bath size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">Bathrooms</p>
                                    <p className="text-xl font-bold text-gray-900">{property.bathrooms}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-50 p-3 rounded-full text-indigo-600">
                                    <MapPin size={24} /> {/* Using MapPin as generic icon for Area if Sqft not avail */}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">Area</p>
                                    <p className="text-xl font-bold text-gray-900">{property.area.toLocaleString()} sqft</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {property.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {property.features?.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                                        <div className="text-emerald-500"><Check size={20} /></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Agent Info */}
                    <div className="bg-gray-50 p-8 md:p-12">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-1">Price</p>
                            <p className="text-4xl font-bold text-indigo-600 mb-4">
                                Rs. {property.price.toLocaleString()}
                                {property.status === 'Rent' && <span className="text-xl text-gray-400 font-normal">/mo</span>}
                            </p>
                            <div className="flex gap-3 mb-6">
                                <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                                    Contact Agent
                                </button>
                                <SaveButton propertyId={property.id} />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Agent Information</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                <div>
                                    <p className="font-bold text-gray-900">Sample Agent</p>
                                    <p className="text-sm text-gray-500">Senior Real Estate Agent</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm text-gray-600">
                                <p>+92-333-1234567</p>
                                <p>sampleagent@propertyx.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
