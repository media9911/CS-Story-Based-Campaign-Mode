import React, { createContext, useState, useContext, ReactNode } from 'react';
import { campaignScenarios } from '../data/campaignData';
import { CampaignContextType } from '../types/campaign';

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(-1); // -1 means campaign not started
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [userPoints, setUserPoints] = useState<Record<string, number>>({});

  const startCampaign = () => {
    setCurrentScenarioIndex(0);
    setCurrentStepIndex(0);
    setUserChoices({});
    setUserPoints({});
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
    setUserPoints({});
  };

  const selectOption = (stepId: string, optionId: string) => {
    // Store the user's choice
    setUserChoices(prevChoices => ({
      ...prevChoices,
      [stepId]: optionId
    }));

    // Calculate points for this selection
    if (currentScenarioIndex >= 0 && currentScenarioIndex < campaignScenarios.length) {
      const currentScenario = campaignScenarios[currentScenarioIndex];
      const step = currentScenario.steps.find(s => s.id === stepId);
      
      if (step) {
        const option = step.options.find(o => o.id === optionId);
        if (option) {
          const scenarioKey = currentScenario.scenarioKey;
          
          // Get current points for this scenario
          const currentScenarioPoints = userPoints[scenarioKey] || 0;
          
          // If user already answered this question, subtract the previous points
          const previousOptionId = userChoices[stepId];
          let pointsToAdd = 0;
          
          // Award 1 point for correct answers
          if (option.correct) {
            pointsToAdd = 1;
          }
          
          if (previousOptionId && previousOptionId !== optionId) {
            const previousOption = step.options.find(o => o.id === previousOptionId);
            if (previousOption && previousOption.correct) {
              // Remove previous correct answer's point
              pointsToAdd -= 1;
            }
          }
          
          // Update points for this scenario
          setUserPoints(prevPoints => ({
            ...prevPoints,
            [scenarioKey]: Math.max(0, currentScenarioPoints + pointsToAdd)
          }));
        }
      }
    }
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

  const getCurrentScenarioPoints = (): number => {
    if (currentScenarioIndex >= 0 && currentScenarioIndex < campaignScenarios.length) {
      const scenarioKey = campaignScenarios[currentScenarioIndex].scenarioKey;
      return userPoints[scenarioKey] || 0;
    }
    return 0;
  };

  const getScenarioPoints = (scenarioKey: string): number => {
    return userPoints[scenarioKey] || 0;
  };

  const canCompleteScenario = () => {
    if (currentScenarioIndex >= 0 && currentScenarioIndex < campaignScenarios.length) {
      const currentScenario = campaignScenarios[currentScenarioIndex];
      
      // Check if all vital steps have been answered correctly
      const vitalSteps = currentScenario.steps.filter(step => step.vital);
      const allVitalStepsCorrect = vitalSteps.every(step => {
        const userChoice = userChoices[step.id];
        if (!userChoice) return false;
        
        // Find if the selected option is correct
        const selectedOption = step.options.find(option => option.id === userChoice);
        return selectedOption && selectedOption.correct;
      });
      
      // Check if all steps have been answered
      const allStepsAnswered = currentScenario.steps.every(step => !!userChoices[step.id]);
      
      // If all vital steps are correct and all questions are answered, allow completion
      return allVitalStepsCorrect && allStepsAnswered;
    }
    return false;
  };

  const value: CampaignContextType = {
    scenarios: campaignScenarios,
    currentScenarioIndex,
    completedScenarios,
    currentStepIndex,
    userChoices,
    userPoints,
    startCampaign,
    completeCurrentScenario,
    resetCampaign,
    selectOption,
    nextStep,
    prevStep,
    resetSteps,
    canCompleteScenario,
    getCurrentScenarioPoints,
    getScenarioPoints
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
