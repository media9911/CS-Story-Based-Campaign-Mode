import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import SafetyStepQuestion from './SafetyStepQuestion';

interface ScenarioDetailProps {
  onBack: () => void;
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({ onBack }) => {
  const { 
    scenarios, 
    currentScenarioIndex, 
    currentStepIndex, 
    userChoices, 
    selectOption, 
    nextStep, 
    prevStep, 
    canCompleteScenario, 
    completeCurrentScenario 
  } = useCampaign();
  
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  if (currentScenarioIndex < 0 || currentScenarioIndex >= scenarios.length) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <p className="text-center text-gray-700">No scenario selected.</p>
        <button 
          onClick={onBack}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const currentScenario = scenarios[currentScenarioIndex];
  const currentStep = currentScenario.steps[currentStepIndex];
  const selectedOptionId = userChoices[currentStep.id];
  const isLastStep = currentStepIndex === currentScenario.steps.length - 1;
  const canComplete = canCompleteScenario();
  
  const handleSelectOption = (stepId: string, optionId: string) => {
    selectOption(stepId, optionId);
    setShowFeedback(true);
  };
  
  const handleNextStep = () => {
    setShowFeedback(false);
    nextStep();
  };
  
  const handlePrevStep = () => {
    setShowFeedback(false);
    prevStep();
  };
  
  const handleCompleteScenario = () => {
    completeCurrentScenario();
    setShowFeedback(false);
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        
        <div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">{currentScenario.title}</h2>
            <span className="ml-3 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              Day {currentScenario.day}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{currentScenario.description}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${((currentStepIndex + 1) / currentScenario.steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Step {currentStepIndex + 1} of {currentScenario.steps.length}</span>
          <span>{Math.round(((currentStepIndex + 1) / currentScenario.steps.length) * 100)}% Complete</span>
        </div>
      </div>
      
      <SafetyStepQuestion 
        step={currentStep}
        selectedOptionId={selectedOptionId}
        onSelectOption={handleSelectOption}
        showFeedback={showFeedback}
      />
      
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className={`flex items-center py-2 px-4 rounded-lg ${
            currentStepIndex === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeft size={20} className="mr-1" />
          Previous
        </button>
        
        {isLastStep ? (
          <button
            onClick={handleCompleteScenario}
            disabled={!canComplete}
            className={`flex items-center py-2 px-6 rounded-lg ${
              canComplete 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {canComplete ? (
              <>
                <CheckCircle size={20} className="mr-2" />
                Complete Scenario
              </>
            ) : (
              <>
                <AlertTriangle size={20} className="mr-2" />
                Complete All Vital Steps
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
            <ChevronRight size={20} className="ml-1" />
          </button>
        )}
      </div>
      
      {isLastStep && !canComplete && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle size={24} className="text-yellow-500 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800">Incomplete Vital Steps</h4>
              <p className="text-yellow-700 text-sm mt-1">
                You must correctly answer all vital safety questions before completing this scenario.
                Review your answers to the questions marked as "VITAL".
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioDetail;
