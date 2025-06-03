export interface SafetyStep {
  id: string;
  description: string;
  vital: boolean;
  options: SafetyStepOption[];
}

export interface SafetyStepOption {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface Scenario {
  title: string;
  day: number;
  scenarioKey: string;
  description: string;
  steps: SafetyStep[];
}

export interface CampaignContextType {
  scenarios: Scenario[];
  currentScenarioIndex: number;
  completedScenarios: string[];
  currentStepIndex: number;
  userChoices: Record<string, string>;
  startCampaign: () => void;
  completeCurrentScenario: () => void;
  resetCampaign: () => void;
  selectOption: (stepId: string, optionId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  canCompleteScenario: () => boolean;
}
