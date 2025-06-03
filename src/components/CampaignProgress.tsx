import React from 'react';
import { useCampaign } from '../context/CampaignContext';

const CampaignProgress: React.FC = () => {
  const { scenarios, completedScenarios } = useCampaign();
  const totalScenarios = scenarios.length;
  const completedCount = completedScenarios.length;
  const progressPercentage = totalScenarios > 0 
    ? Math.round((completedCount / totalScenarios) * 100) 
    : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Campaign Progress</span>
        <span className="text-sm font-medium text-blue-600">{completedCount}/{totalScenarios} Days</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 mt-1">
        {progressPercentage === 100 
          ? 'Training complete! Great job!' 
          : `${progressPercentage}% complete`}
      </p>
    </div>
  );
};

export default CampaignProgress;
