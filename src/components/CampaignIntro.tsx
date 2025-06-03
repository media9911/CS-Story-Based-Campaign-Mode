import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { HardHat } from 'lucide-react';

const CampaignIntro: React.FC = () => {
  const { startCampaign } = useCampaign();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-600 p-4 rounded-full">
          <HardHat size={48} className="text-white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Confined Space Safety Training
      </h1>
      
      <div className="mb-8">
        <img 
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Industrial worker in confined space" 
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      
      <div className="space-y-4 mb-8">
        <p className="text-gray-700">
          Welcome to your confined space safety training program. This interactive course will guide you through essential safety protocols, hazard recognition, and emergency procedures for working in confined spaces.
        </p>
        
        <p className="text-gray-700">
          Each scenario presents new challenges to help you build your knowledge progressively. You must complete each scenario in sequence before moving to the next one.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">What you'll learn:</h3>
          <ul className="list-disc pl-5 text-blue-700 space-y-1">
            <li>Confined space hazard identification</li>
            <li>Proper permit procedures</li>
            <li>Atmospheric testing requirements</li>
            <li>Communication protocols</li>
            <li>Emergency response techniques</li>
            <li>Equipment inspection and usage</li>
          </ul>
        </div>
      </div>
      
      <button
        onClick={startCampaign}
        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Begin safety training campaign"
      >
        Start Training
      </button>
    </div>
  );
};

export default CampaignIntro;
