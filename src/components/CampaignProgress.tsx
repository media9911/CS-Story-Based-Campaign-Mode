import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Award } from 'lucide-react';

const CampaignProgress: React.FC = () => {
  const { scenarios, completedScenarios } = useCampaign();
  const totalScenarios = scenarios.length;
  const completedCount = completedScenarios.length;
  const progressPercentage = totalScenarios > 0 
    ? Math.round((completedCount / totalScenarios) * 100) 
    : 0;

  // Calculate total points earned across all scenarios
  const { userPoints } = useCampaign();
  const totalPointsEarned = Object.values(userPoints).reduce((sum, points) => sum + points, 0);
  
  // Calculate total possible points
  const totalPossiblePoints = scenarios.reduce((sum, scenario) => sum + scenario.requiredPoints, 0);

  return (
    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Campaign Progress</span>
        <span className="text-sm font-medium text-blue-600">{completedCount}/{totalScenarios} Days</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center text-sm text-purple-700">
          <Award className="text-purple-600 mr-1" size={16} />
          <span>Total Points</span>
        </div>
        <span className="text-sm font-medium text-purple-700">
          {totalPointsEarned} / {totalPossiblePoints}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${totalPossiblePoints > 0 ? (totalPointsEarned / totalPossiblePoints) * 100 : 0}%` }}
          role="progressbar"
          aria-label="Total points earned"
        ></div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        {progressPercentage === 100 
          ? 'Training complete! Great job!' 
          : `${progressPercentage}% of training completed`}
      </p>
    </div>
  );
};

export default CampaignProgress;
