import { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [status, setStatus] = useState('Loading...');
  const [lastChecked, setLastChecked] = useState(null);
  const [pingHistory, setPingHistory] = useState([]);

  useEffect(() => {
    const checkWebsite = async () => {
      try {
        const response = await fetch('/api/ping');
        const data = await response.json();
        setStatus(data.status);
        setLastChecked(new Date().toLocaleString());
        fetchPingHistory();
      } catch (error) {
        setStatus('Error checking website');
      }
    };

    const fetchPingHistory = async () => {
      const { data, error } = await supabase
        .from('ping_results')
        .select('*')
        .order('created_at', { ascending: false })
        .range(1, 10);

      if (error) {
        console.error('Error fetching ping history:', error);
      } else {
        setPingHistory(data);
      }
    };

    checkWebsite();
    const interval = setInterval(checkWebsite, 6000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Website Status</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Website Status</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-500 mb-8">https://wtbi.agency</h2>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">{status}</p>
              {lastChecked && (
                <p className="text-sm text-gray-500">Last checked: {lastChecked}</p>
              )}
            </div>
            <div className={`w-4 h-4 rounded-full ${status.includes('up') ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Ping History</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Timestamp</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Response Time</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {pingHistory.map((ping) => (
                  <tr key={ping.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {new Date(ping.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className={`${ping.status === 'up' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'} py-1 px-3 rounded-full text-xs`}>
                        {ping.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {ping.response_time}ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
