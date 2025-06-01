const AboutSettings = () => {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">About</h1>
      </header>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Version: <span className="text-gray-800">1.0.0</span></div>
          <div className="text-sm text-gray-600 mb-1">Last Updated: <span className="text-gray-800">[Insert Date]</span></div>
          <div className="text-sm text-gray-600 mb-4">Maintained by: <span className="text-gray-800">RDLab Development Team</span></div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center mr-2">
              <span className="text-blue-500 text-xs font-bold">i</span>
            </div>
            <h2 className="text-base font-medium text-gray-800">What is RDLab?</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            RDLab is a web-based research assistant platform designed specifically for the Oil and Gas industry. It 
            leverages advanced AI techniques, including Graph-based Retrieval-Augmented Generation 
            (GraphRAG), to help users streamline literature reviews, technical document analysis, and knowledge 
            discovery.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className="w-5 h-5 mr-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-600">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <path d="M9 9h6v6H9z"/>
              </svg>
            </div>
            <h2 className="text-base font-medium text-gray-800">Key Features</h2>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 ml-7">
            <li>• Smart search across technical manuals, incident reports, and regulations</li>
            <li>• Automatic document indexing and categorization</li>
            <li>• Pattern recognition and prediction based on historical data</li>
            <li>• Graph-based reasoning to identify trends and knowledge gaps</li>
            <li>• Admin tools for system monitoring, user management, and performance reporting</li>
          </ul>
        </div>

        <div>
          <div className="flex items-center mb-3">
            <div className="w-5 h-5 mr-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-600">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h2 className="text-base font-medium text-gray-800">Contact & Support</h2>
          </div>
          <div className="ml-7">
            <p className="text-sm text-gray-600 mb-2">For support, feature requests, or bug reports, please contact:</p>
            <div className="text-sm">
              <a href="mailto:rdlab-support@example.com" className="text-blue-600 hover:text-blue-800 block">
                rdlab-support@example.com
              </a>
              <a href="http://www.rdlab-platform.example" className="text-blue-600 hover:text-blue-800 block">
                www.rdlab-platform.example
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;