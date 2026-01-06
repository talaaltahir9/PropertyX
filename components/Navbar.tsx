import Link from 'next/link';
import { Home, Search, Heart, User, PlusCircle, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { signout } from '@/app/auth/actions';

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-600 text-white p-2 rounded-lg group-hover:bg-indigo-700 transition">
                        <Home size={24} />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">Property<span className="text-indigo-600">X</span></span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition">Home</Link>
                    <Link href="/properties" className="text-gray-600 hover:text-indigo-600 font-medium transition">Properties</Link>
                    <Link href="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition">About</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/favorites" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-red-500 transition">
                        <Heart size={20} />
                        <span className="text-sm font-medium">Saved</span>
                    </Link>

                    <Link href="/add-property" className="hidden md:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition">
                        <PlusCircle size={20} />
                        <span>List Item</span>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="text-sm font-medium text-gray-900 hidden sm:block">
                                {user.email}
                            </div>
                            <form action={signout}>
                                <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition" title="Sign Out">
                                    <LogOut size={20} />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <Link href="/login" className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition shadow-sm">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
