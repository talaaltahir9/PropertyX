import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AddPropertyForm from './add-property-form';

export default async function AddPropertyPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">Add New Property</h1>

            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <AddPropertyForm />
            </div>
        </div>
    );
}
