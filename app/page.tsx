import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  // Fetch top 4 recent properties
  const { data: featuredProperties } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const finalProperties = featuredProperties || [];


  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/10 to-gray-900/90" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-md text-indigo-300 font-medium text-sm tracking-wide animate-fade-in">
            #1 Real Estate Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            Discover a Place <br />
            You'll Love to Live
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Beautiful homes, apartments, and plots for sale and rent in the most desired locations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/properties"
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              Browse Properties <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-gray-800">
          <div className="p-4">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">2k+</h3>
            <p className="text-gray-500 font-medium">Properties Listed</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">5k+</h3>
            <p className="text-gray-500 font-medium">Happy Customers</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">100+</h3>
            <p className="text-gray-500 font-medium">Awards Won</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-indigo-600 mb-2">24/7</h3>
            <p className="text-gray-500 font-medium">Support Available</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-blue-700">Featured Properties</h2>
            <p className="text-gray-500 text-lg max-w-2xl">Handpicked properties by our team of experts, available now.</p>
          </div>
          <Link href="/properties" className="hidden md:flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {finalProperties.map((prop: any) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/properties" className="inline-flex items-center gap-2 text-indigo-600 font-bold border border-indigo-100 px-6 py-3 rounded-xl bg-indigo-50">
            View All Properties <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Why Choose PropertyX?</h2>
            <p className="text-gray-500 text-lg">We provide a complete service for the sale, purchase or rental of real estate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Property Insurance</h3>
              <p className="text-gray-500 leading-relaxed">
                We offer property insurance for all our listings to ensure your peace of mind.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Top Rated Agents</h3>
              <p className="text-gray-500 leading-relaxed">
                Our agents are top rated in the industry and are here to help you every step of the way.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Processing</h3>
              <p className="text-gray-500 leading-relaxed">
                We process all paperwork and legalities quickly so you can move in sooner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-indigo-600 rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-900 opacity-20 rounded-full blur-3xl" />

          <div className="relative z-10 px-8 py-20 md:py-24 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Looking to Sell or Rent Your Property?</h2>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              List your property with us and reach thousands of potential buyers and tenants today.
            </p>
            <Link href="/add-property" className="bg-white text-indigo-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition shadow-xl">
              Add Your Listing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}