import Link from 'next/link';
import { MapPin, Bed, Bath, ArrowRight } from 'lucide-react';
import { Property } from '@/types';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link href={`/property/${property.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
                {/* Placeholder for Image - in real app would be Next/Image */}
                <div
                    className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center"
                    style={{ backgroundImage: `url(${property.images[0]})` }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider shadow-sm">
                    {property.type}
                </div>
                <div className={`absolute top-4 right-4 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${property.status === 'Rent' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                    For {property.status}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-indigo-600 transition line-clamp-1">{property.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1 text-indigo-500" />
                            <span className="line-clamp-1">{property.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-1.5" title="Bedrooms">
                        <Bed size={18} className="text-gray-400" />
                        <span className="font-medium text-gray-700">{property.bedrooms} <span className="text-xs text-gray-400 font-normal">Beds</span></span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Bathrooms">
                        <Bath size={18} className="text-gray-400" />
                        <span className="font-medium text-gray-700">{property.bathrooms} <span className="text-xs text-gray-400 font-normal">Baths</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-auto text-xs text-gray-400">
                        {property.area.toLocaleString()} sqft
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <p className="text-xl font-bold text-indigo-600">
                        Rs. {property.price.toLocaleString()}
                        {property.status === 'Rent' && <span className="text-sm text-gray-400 font-normal">/mo</span>}
                    </p>
                    <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
