import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { CheckCircle, Lock, ArrowRight } from 'lucide-react';
import CampaignIntro from './CampaignIntro';
import ScenarioDetail from './ScenarioDetail';
import CampaignComplete from './CampaignComplete';

const CampaignDashboard: React.FC = () => {
  const { 
    scenarios, 
    currentScenarioIndex, 
    completedScenarios, 
    resetCampaign,
    setViewingScenarioIndex,
    isAllScenariosCompleted,
    setScenarioForReview,
    continueActiveScenario
  } = useCampaign();
  
  const [viewingScenario, setViewingScenario] = useState<boolean>(currentScenarioIndex >= 0);
  
  // If campaign hasn't started, show intro
  if (currentScenarioIndex < 0) {
    return <CampaignIntro />;
  }
  
  // If all scenarios are completed, show completion screen
  if (isAllScenariosCompleted()) {
    return <CampaignComplete />;
  }
  
  // If viewing a specific scenario
  if (viewingScenario) {
    return <ScenarioDetail onBack={() => setViewingScenario(false)} />;
  }
  
  // Otherwise show the dashboard/overview
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Safety Training Progress</h1>
        <button
          onClick={resetCampaign}
          className="py-2 px-4 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
        >
          Reset Training
        </button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario, index) => {
          const isCompleted = completedScenarios.includes(scenario.scenarioKey);
          const isActive = index === currentScenarioIndex;
          const isLocked = index > currentScenarioIndex && !isCompleted;
          
          return (
            <div 
              key={scenario.scenarioKey}
              className={`p-5 border rounded-lg shadow-sm transition ${
                isCompleted 
                  ? 'border-green-200 bg-green-50' 
                  : isActive 
                    ? 'border-blue-200 bg-blue-50' 
                    : isLocked 
                      ? 'border-gray-200 bg-gray-50 opacity-75' 
                      : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Day {scenario.day}
                </span>
                
                {isCompleted ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : isLocked ? (
                  <Lock size={20} className="text-gray-400" />
                ) : null}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{scenario.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
              
              <div className="mt-auto">
                {isLocked ? (
                  <button
                    disabled
                    className="w-full py-2 flex items-center justify-center text-gray-500 bg-gray-100 rounded-lg cursor-not-allowed"
                  >
                    <Lock size={16} className="mr-2" />
                    Locked
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (isCompleted && !isActive) {
                        // For completed scenarios, set review mode
                        setScenarioForReview(scenario.scenarioKey);
                      } else if (isActive) {
                        // For active scenario, continue from where left off
                        continueActiveScenario();
                      } else {
                        // For any other case, set the viewing index
                        setViewingScenarioIndex(index);
                      }
                      setViewingScenario(true);
                    }}
                    className={`w-full py-2 flex items-center justify-center rounded-lg ${
                      isCompleted 
                        ? 'text-green-700 bg-green-100 hover:bg-green-200' 
                        : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                    }`}
                  >
                    {isCompleted ? 'Review' : isActive ? 'Continue' : 'Start'}
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignDashboard;
