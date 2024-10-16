import Head from 'next/head';

export default function Reports() {
  return (
    <>
      <Head>
        <title>Reports</title>
      </Head>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>
        
        {/* Sample Chart */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
          <div className="h-64 bg-gray-200 rounded-lg flex items-end justify-around p-4">
            <div className="w-8 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{height: '40%'}}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{height: '90%'}}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{height: '50%'}}></div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Q4 Financial Summary</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Annual Marketing Analysis</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Customer Satisfaction Survey Results</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm">View</button>
            </li>
          </ul>
        </div>

        {/* Generate Report Button */}
        <div className="mt-6">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Generate New Report
          </button>
        </div>
      </div>
    </>
  );
}
