import { Home, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg">
                            <Home size={20} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Property<span className="text-indigo-600">X</span></span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        The modern way to find property. We make buying, selling, and renting real estate seamless and efficient.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/properties" className="hover:text-white transition">All Properties</a></li>
                        <li><a href="/properties?status=Rent" className="hover:text-white transition">For Rent</a></li>
                        <li><a href="/properties?status=Sale" className="hover:text-white transition">For Sale</a></li>
                        <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-3"><MapPin size={16} />National Textile University, FSD</li>
                        <li className="flex items-center gap-3"><Phone size={16} /> +92-333-1234567</li>
                        <li className="flex items-center gap-3"><Mail size={16} /> support@propertyx.com</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
                &copy; {new Date().getFullYear()} PropertyX. All rights reserved.
            </div>
        </footer>
    );
}
