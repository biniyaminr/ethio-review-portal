import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Search, Inbox, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingLeads();
  }, []);

  const fetchPendingLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('business_leads')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setLeads(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pending leads.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const { error: updateError } = await supabase
        .from('business_leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (updateError) throw updateError;

      // Optimistically remove the lead from UI
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err: any) {
      alert(`Error updating lead status: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* ── Admin Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors">
                ← Back to Site
              </Link>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Moderator Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-sm font-medium text-gray-500">
               <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded-md">{leads.length}</span> pending
             </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
           <div className="relative">
             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
             <input type="text" placeholder="Search companies..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 w-64" />
           </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
            <button onClick={fetchPendingLeads} className="ml-auto underline text-sm font-bold">Retry</button>
          </div>
        )}

        {/* ── Data Table ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden text-sm">
          {loading ? (
             <div className="p-16 flex flex-col items-center justify-center text-gray-400">
                <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mb-4"></div>
                Loading requests...
             </div>
          ) : leads.length === 0 ? (
             <div className="p-16 flex flex-col items-center justify-center text-gray-400">
                <Inbox className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-lg text-gray-600 font-medium">All caught up!</p>
                <p>No pending requests waiting for your review.</p>
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Applicant</th>
                    <th className="px-6 py-4 font-medium">Company Name</th>
                    <th className="px-6 py-4 font-medium">Contact Details</th>
                    <th className="px-6 py-4 font-medium bg-gray-50 sticky right-0 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{lead.first_name} {lead.last_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{lead.company_name}</div>
                        {lead.website_url && (
                          <a href={lead.website_url.startsWith('http') ? lead.website_url : `https://${lead.website_url}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                            Website ↗
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        <div>{lead.email}</div>
                        <div>{lead.phone_number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap sticky right-0 bg-white/50 backdrop-blur-md text-right group-hover:bg-gray-50/50">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStatus(lead.id, 'rejected')}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors border border-transparent hover:border-red-100"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(lead.id, 'approved')}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-green-700 bg-green-50 hover:bg-green-100 rounded-lg font-medium transition-colors border border-green-200 shadow-sm"
                          >
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
