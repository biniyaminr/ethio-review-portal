import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { supabase } from '../lib/supabaseClient';

export function ClaimBusiness() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    phoneNumber: '',
    companyName: '',
    websiteUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Save email for success message before clearing form
    const submittedEmail = formData.businessEmail;

    try {
      const { error: submitError } = await supabase.from('business_leads').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.businessEmail,
          phone_number: formData.phoneNumber,
          company_name: formData.companyName,
          website_url: formData.websiteUrl,
        }
      ]);

      if (submitError) throw submitError;

      setSuccess(true);
      toast.success('Request received!', {
        description: 'Our team will contact you shortly to verify your business.',
      });
      // Optionally reset form
      setFormData({
        firstName: '',
        lastName: '',
        businessEmail: submittedEmail,
        phoneNumber: '',
        companyName: '',
        websiteUrl: '',
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred submitting your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-900 font-sans text-white md:flex selection:bg-green-300 selection:text-green-900">
      <Toaster position="top-center" richColors />
      
      {/* ── Left Column: Marketing ── */}
      <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        {/* Background graphic */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 opacity-10 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="white" />
          </svg>
        </div>

        <Link to="/" className="text-2xl font-extrabold tracking-tight mb-16 inline-block w-fit hover:opacity-80 transition-opacity">
          Trust<span className="text-green-300">Ethio</span> <span className="font-medium text-sm ml-2 px-2 py-1 bg-green-800 rounded-lg text-green-200">For Business</span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Drive sales and build trust with Ethiopian consumers.
        </h1>
        <p className="text-lg md:text-xl text-green-100 mb-12 max-w-2xl">
          Claim your free Truth Ethio profile to showcase your verified status, respond to customer reviews, and grow your reputation across the nation.
        </p>

        <div className="space-y-6">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-300" />
             </div>
             <div>
                <h3 className="font-bold text-lg">Verified Badge</h3>
                <p className="text-green-200 text-sm">Instantly stand out from competitors with a verified tick.</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-green-300" />
             </div>
             <div>
                <h3 className="font-bold text-lg">Engage Customers</h3>
                <p className="text-green-200 text-sm">Reply directly to both positive and negative experiences.</p>
             </div>
           </div>

           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-green-300" />
             </div>
             <div>
                <h3 className="font-bold text-lg">Analytics Dashboard</h3>
                <p className="text-green-200 text-sm">Track your Trust Score and click-through rates locally.</p>
             </div>
           </div>
        </div>
      </div>

      {/* ── Right Column: The Form ── */}
      <div className="flex-1 bg-green-50 p-8 md:p-16 flex items-center justify-center text-gray-900 border-l border-green-800/20 shadow-2xl">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Request Received!</h2>
              <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                Our team will verify your business and contact you shortly at <span className="font-semibold text-gray-900">{formData.businessEmail}</span>.
              </p>
              <Link to="/" className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow">
                Back to Homepage
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Claim your free profile</h2>
                <p className="text-sm text-gray-500">Takes less than 2 minutes to submit your details.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1.5">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  placeholder="Abebe"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1.5">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  placeholder="Kebede"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="businessEmail" className="block text-sm font-semibold text-gray-700 mb-1.5">Work email address</label>
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                required
                value={formData.businessEmail}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                placeholder="abebe@yourcompany.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone number (Optional)</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                placeholder="+251 911 234 567"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-1.5">Company name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                placeholder="Abebe Retail PLC"
              />
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-semibold text-gray-700 mb-1.5">Website (Optional)</label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                placeholder="https://www.yourcompany.com"
              />
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-400 leading-tight">
              By registering, you confirm that you are an authorized representative of this business and agree to Trust Ethio's <a href="#" className="text-green-600 hover:underline">Terms of Service for Businesses</a>.
            </p>

            {/* Submit */}
            <button
               type="submit"
               disabled={loading}
               className={`w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-green-600/20 ${
                 loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
               }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Building className="w-5 h-5" />
                  Claim My Business
                </>
              )}
            </button>
          </form>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
