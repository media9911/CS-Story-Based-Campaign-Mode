import React, { createContext, useState, useContext, ReactNode } from 'react';
import { campaignScenarios } from '../data/campaignData';
import { CampaignContextType } from '../types/campaign';

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(-1); // -1 means campaign not started
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});

  const startCampaign = () => {
    setCurrentScenarioIndex(0);
    setCurrentStepIndex(0);
    setUserChoices({});
  };

  const completeCurrentScenario = () => {
    if (currentScenarioIndex >= 0 && currentScenarioIndex < campaignScenarios.length) {
      const scenarioKey = campaignScenarios[currentScenarioIndex].scenarioKey;
      
      // Add to completed scenarios if not already there
      if (!completedScenarios.includes(scenarioKey)) {
        setCompletedScenarios([...completedScenarios, scenarioKey]);
      }
      
      // Move to next scenario if available
      if (currentScenarioIndex < campaignScenarios.length - 1) {
        setCurrentScenarioIndex(currentScenarioIndex + 1);
        setCurrentStepIndex(0); // Reset to first step of new scenario
      }
    }
  };

  const resetCampaign = () => {
    setCurrentScenarioIndex(-1);
    setCompletedScenarios([]);
    setCurrentStepIndex(0);
    setUserChoices({});
  };

  const selectOption = (stepId: string, optionId: string) => {
    setUserChoices({
      ...userChoices,
      [stepId]: optionId
    });
  };

  const nextStep = () => {
    if (currentScenarioIndex >= 0 && currentScenarioIndex < campaignScenarios.length) {
      const currentScenario = campaignScenarios[currentScenarioIndex];
      if (currentStepIndex < currentScenario.steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const resetSteps = () => {
    setCurrentStepIndex(0);
  };

  const canCompleteScenario = () => {
    if (currentScenarioIndex >= 0 && currentScenarioIndex < campaignScenarios.length) {
      const currentScenario = campaignScenarios[currentScenarioIndex];
      
      // Check if all vital steps have been answered
      const vitalSteps = currentScenario.steps.filter(step => step.vital);
      
      return vitalSteps.every(step => {
        const userChoice = userChoices[step.id];
        if (!userChoice) return false;
        
        // Find if the selected option is correct
        const selectedOption = step.options.find(option => option.id === userChoice);
        return selectedOption && selectedOption.correct;
      });
    }
    return false;
  };

  const value: CampaignContextType = {
    scenarios: campaignScenarios,
    currentScenarioIndex,
    completedScenarios,
    currentStepIndex,
    userChoices,
    startCampaign,
    completeCurrentScenario,
    resetCampaign,
    selectOption,
    nextStep,
    prevStep,
    resetSteps,
    canCompleteScenario
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
