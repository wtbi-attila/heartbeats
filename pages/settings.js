import { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function Settings() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [textSize, setTextSize] = useState('medium');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Load saved settings
    const savedTextSize = localStorage.getItem('textSize') || 'medium';
    setTextSize(savedTextSize);
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  const handleTextSizeChange = (size) => {
    setTextSize(size);
    localStorage.setItem('textSize', size);
    document.documentElement.className = document.documentElement.className.replace(/text-(sm|base|lg)/g, '');
    document.documentElement.classList.add(`text-${size}`);
  };

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
        
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Profile</h2>
          <p className="mb-4 dark:text-gray-300">Email: {user?.email}</p>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Dashboard Settings Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Dashboard Settings</h2>
          <div className="space-y-4">
            <div>
              <span className="text-gray-700 dark:text-gray-300 block mb-2">Text Size</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleTextSizeChange('sm')}
                  className={`px-4 py-2 rounded ${textSize === 'sm' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Small
                </button>
                <button
                  onClick={() => handleTextSizeChange('base')}
                  className={`px-4 py-2 rounded ${textSize === 'base' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Medium
                </button>
                <button
                  onClick={() => handleTextSizeChange('lg')}
                  className={`px-4 py-2 rounded ${textSize === 'lg' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Large
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
