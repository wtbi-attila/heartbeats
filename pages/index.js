import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Total Projects</h2>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">24</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Active Documents</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">137</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Pending Reports</h2>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">9</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Project</span>
              <p className="dark:text-gray-300">New project "Website Redesign" created</p>
            </li>
            <li className="flex items-center">
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Document</span>
              <p className="dark:text-gray-300">Contract for "Client XYZ" uploaded</p>
            </li>
            <li className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Report</span>
              <p className="dark:text-gray-300">Monthly analytics report generated</p>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/projects/new" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded text-center">
              New Project
            </Link>
            <Link href="/documents/upload" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center">
              Upload Document
            </Link>
            <Link href="/reports/generate" className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-center">
              Generate Report
            </Link>
            <Link href="/settings" className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-center">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
