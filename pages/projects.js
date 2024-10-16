import Head from 'next/head';

export default function Projects() {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', completion: 65 },
    { id: 2, name: 'Mobile App Development', status: 'Planning', completion: 20 },
    { id: 3, name: 'Database Migration', status: 'Completed', completion: 100 },
    { id: 4, name: 'API Integration', status: 'In Progress', completion: 45 },
  ];

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects</h1>
        
        {/* Project List */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${project.completion}%`}}></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.completion}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Project Button */}
        <div className="mt-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Create New Project
          </button>
        </div>
      </div>
    </>
  );
}
