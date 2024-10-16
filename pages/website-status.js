import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import LoadingButton from '../components/buttons/loading-button';

export default function WebsiteStatus() {
  const [status, setStatus] = useState('Loading...');
  const [lastChecked, setLastChecked] = useState(null);
  const [pingHistory, setPingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const router = useRouter();

  const recordsPerPage = 10;

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.user_metadata && user.user_metadata.role === 'client') {
        setWebsiteUrl(user.user_metadata.websiteUrl);
        checkWebsite(user.user_metadata.websiteUrl);
      } else {
        router.push('/'); // Redirect to home if not a client
      }
    };

    checkUserRole();
  }, [router]);

  const checkWebsite = async (url) => {
    try {
      const response = await fetch('/api/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteUrl: url }),
      });
      const data = await response.json();
      setStatus(data.status);
      setLastChecked(new Date().toLocaleString());
      fetchPingHistory();
    } catch (error) {
      setStatus('Error checking website');
    }
  };

  useEffect(() => {
    fetchPingHistory();
  }, [currentPage]);

  const fetchPingHistory = async () => {
    setLoading(true);
    const { data, error, count } = await supabase
      .from('ping_results')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage - 1);

    if (error) {
      console.error('Error fetching ping history:', error);
    } else {
      setPingHistory(data);
      setTotalPages(Math.ceil(count / recordsPerPage));
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button key="1" onClick={() => handlePageChange(1)} className="px-2 py-1 text-sm">
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 text-sm ${currentPage === i
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            } rounded`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      buttons.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="px-2 py-1 text-sm">
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return <LoadingButton positionX={'items-center'} positionY={'justify-center'}/>
  }

  return (
    <>
      <Head>
        <title>Website Status</title>
      </Head>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Website Status</h1>
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Current Status</h2>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="text-lg font-medium dark:text-gray-300">{status}</p>
                  <div className={`w-4 h-4 rounded-full ${status.includes('up') ? 'bg-green-500' : 'bg-red-500'} ml-2`}></div>
                </div>
                
                {websiteUrl && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Website: {websiteUrl}</p>
                )}
                {lastChecked && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last checked: {lastChecked}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Ping History</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Timestamp</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Response Time</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
                  {pingHistory.map((ping) => (
                    <tr key={ping.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
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
            {/* Updated Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Previous
              </button>
              <div className="flex space-x-1">
                {renderPaginationButtons()}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
