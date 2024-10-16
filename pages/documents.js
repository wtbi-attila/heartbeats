import Head from 'next/head';

export default function Documents() {
  const documents = [
    { id: 1, name: 'Q4 Financial Report.pdf', type: 'PDF', size: '2.3 MB', lastModified: '2023-12-15' },
    { id: 2, name: 'Project Proposal.docx', type: 'Word', size: '1.1 MB', lastModified: '2024-01-05' },
    { id: 3, name: 'Marketing Strategy.pptx', type: 'PowerPoint', size: '5.7 MB', lastModified: '2024-01-10' },
    { id: 4, name: 'Client Contract.pdf', type: 'PDF', size: '0.8 MB', lastModified: '2024-01-12' },
  ];

  return (
    <>
      <Head>
        <title>Documents</title>
      </Head>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Documents</h1>
        
        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
                <h3 className="text-lg font-semibold">{doc.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Type: {doc.type}</p>
              <p className="text-sm text-gray-600 mb-2">Size: {doc.size}</p>
              <p className="text-sm text-gray-600">Last Modified: {doc.lastModified}</p>
            </div>
          ))}
        </div>

        {/* Upload Document Button */}
        <div className="mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Upload New Document
          </button>
        </div>
      </div>
    </>
  );
}
