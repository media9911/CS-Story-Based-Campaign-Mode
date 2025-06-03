export interface SafetyStep {
  id: string;
  description: string;
  vital: boolean;
  options: SafetyStepOption[];
  points: number; // Points awarded for this step
}

export interface SafetyStepOption {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
  pointValue: number; // Point value for this option (can be negative for wrong answers)
}

export interface Scenario {
  title: string;
  day: number;
  scenarioKey: string;
  description: string;
  steps: SafetyStep[];
  requiredPoints: number; // Points required to pass this scenario
}

export interface CampaignContextType {
  scenarios: Scenario[];
  currentScenarioIndex: number;
  completedScenarios: string[];
  currentStepIndex: number;
  userChoices: Record<string, string>;
  userPoints: Record<string, number>; // Track points per scenario
  startCampaign: () => void;
  completeCurrentScenario: () => void;
  resetCampaign: () => void;
  selectOption: (stepId: string, optionId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  canCompleteScenario: () => boolean;
  getCurrentScenarioPoints: () => number;
  getScenarioPoints: (scenarioKey: string) => number;
}
