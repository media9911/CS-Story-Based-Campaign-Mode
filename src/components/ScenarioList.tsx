import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import ScenarioCard from './ScenarioCard';
import CampaignProgress from './CampaignProgress';

const ScenarioList: React.FC = () => {
  const { 
    scenarios, 
    currentScenarioIndex, 
    completedScenarios 
  } = useCampaign();

  const handleSelectScenario = (index: number) => {
    // In a real app, this would navigate to the scenario
    console.log(`Selected scenario: ${scenarios[index].title}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Safety Training Campaign</h2>
      
      <CampaignProgress />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario, index) => {
          const isCompleted = completedScenarios.includes(scenario.scenarioKey);
          const isLocked = index > currentScenarioIndex && !isCompleted;
          const isCurrent = index === currentScenarioIndex;
          
          return (
            <ScenarioCard
              key={scenario.scenarioKey}
              scenario={scenario}
              isCompleted={isCompleted}
              isLocked={isLocked}
              isCurrent={isCurrent}
              onSelect={() => handleSelectScenario(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioList;
