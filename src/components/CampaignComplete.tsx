import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Award, Download, RefreshCw } from 'lucide-react';

const CampaignComplete: React.FC = () => {
  const { resetCampaign } = useCampaign();

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-yellow-100 p-4 rounded-full">
          <Award size={64} className="text-yellow-600" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Congratulations!
      </h1>
      
      <h2 className="text-xl text-gray-700 mb-6">
        You've completed the 7-day Confined Space Safety Training Campaign
      </h2>
      
      <div className="mb-8">
        <img 
          src="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Safety achievement" 
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8 text-left">
        <h3 className="font-semibold text-blue-800 mb-3 text-lg">What you've learned:</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Identifying and assessing confined space hazards</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Proper permit procedures and documentation</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Atmospheric testing and monitoring techniques</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Effective communication protocols</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Emergency response and rescue procedures</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Equipment inspection and maintenance</span>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Download your certificate of completion"
        >
          <Download size={18} />
          <span>Download Certificate</span>
        </button>
        
        <button
          onClick={resetCampaign}
          className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          aria-label="Restart the safety training campaign"
        >
          <RefreshCw size={18} />
          <span>Restart Campaign</span>
        </button>
      </div>
      
      <p className="text-gray-500 text-sm">
        Remember to apply these safety practices in your daily work. Safety is everyone's responsibility.
      </p>
    </div>
  );
};

export default CampaignComplete;
