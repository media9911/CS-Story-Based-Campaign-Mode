import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { ArrowLeft, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, Award, BarChart2, Trophy } from 'lucide-react';
import SafetyStepQuestion from './SafetyStepQuestion';

interface ScenarioDetailProps {
  onBack: () => void;
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({ onBack }) => {
  const { 
    scenarios, 
    currentScenarioIndex,
    viewingScenarioIndex,
    currentStepIndex, 
    userChoices, 
    selectOption, 
    nextStep, 
    prevStep, 
    canCompleteScenario, 
    completeCurrentScenario,
    getCurrentScenarioPoints,
    isAllScenariosCompleted,
    isInReviewMode
  } = useCampaign();
  
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  if (viewingScenarioIndex < 0 || viewingScenarioIndex >= scenarios.length) {
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
  
  const currentScenario = scenarios[viewingScenarioIndex];
  const currentStep = currentScenario.steps[currentStepIndex];
  const selectedOptionId = userChoices[currentStep.id];
  const isLastStep = currentStepIndex === currentScenario.steps.length - 1;
  const canComplete = canCompleteScenario();
  const currentPoints = getCurrentScenarioPoints();
  const allScenariosCompleted = isAllScenariosCompleted();
  
  // Calculate total possible points for this scenario
  const totalPossiblePoints = currentScenario.steps.length;
  
  const handleSelectOption = (stepId: string, optionId: string) => {
    // Only allow selection if not in review mode
    if (!isInReviewMode) {
      selectOption(stepId, optionId);
      setShowFeedback(true);
    }
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
  
  // Check if all vital steps are answered correctly
  const vitalSteps = currentScenario.steps.filter(step => step.vital);
  const allVitalStepsCorrect = vitalSteps.every(step => {
    const userChoice = userChoices[step.id];
    if (!userChoice) return false;
    
    const selectedOption = step.options.find(option => option.id === userChoice);
    return selectedOption && selectedOption.correct;
  });
  
  // Check if all steps have been answered
  const allStepsAnswered = currentScenario.steps.every(step => !!userChoices[step.id]);
  
  // Get scenario image and caption based on scenario key
  const getScenarioImage = () => {
    switch(currentScenario.scenarioKey) {
      case "first-day":
        return {
          src: "https://images.pexels.com/photos/2760344/pexels-photo-2760344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "Industrial worker in safety gear inspecting a confined space",
          caption: "First day at the industrial facility: Learn about confined space hazards and basic safety protocols."
        };
      case "permit-system":
        return {
          src: "https://images.pexels.com/photos/8961251/pexels-photo-8961251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "Worker reviewing safety permits and documentation",
          caption: "Understanding the permit system is crucial for safe confined space operations."
        };
      case "atmospheric-testing":
        return {
          src: "https://images.pexels.com/photos/8961286/pexels-photo-8961286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "Worker using gas detection equipment to test air quality",
          caption: "Proper atmospheric testing can prevent exposure to toxic gases and oxygen deficiency."
        };
      case "communication":
        return {
          src: "https://images.pexels.com/photos/8961267/pexels-photo-8961267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "Workers communicating during confined space operations",
          caption: "Clear communication between entrants and attendants is essential for confined space safety."
        };
      case "emergency":
        return {
          src: "https://images.pexels.com/photos/8961271/pexels-photo-8961271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "Emergency response team conducting a confined space rescue drill",
          caption: "Knowing emergency procedures can save lives when seconds count."
        };
      case "equipment":
        return {
          src: "https://images.pexels.com/photos/8961280/pexels-photo-8961280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "Safety equipment for confined space entry laid out for inspection",
          caption: "Proper inspection and use of safety equipment is your last line of defense."
        };
      case "assessment":
        return {
          src: "https://images.pexels.com/photos/8961254/pexels-photo-8961254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          alt: "Team reviewing safety procedures and conducting final assessment",
          caption: "Final assessment: Put your confined space safety knowledge to the test."
        };
      default:
        return null;
    }
  };
  
  const scenarioImage = getScenarioImage();
  
  // Render completion message if all scenarios are completed
  if (allScenariosCompleted && currentScenarioIndex === scenarios.length - 1 && !isInReviewMode) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <Trophy size={64} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You have successfully completed all confined space safety training scenarios.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Your Training Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario, index) => {
                const scenarioPoints = getCurrentScenarioPoints();
                const totalScenarioPoints = scenario.steps.length;
                const percentage = Math.round((scenarioPoints / totalScenarioPoints) * 100);
                
                return (
                  <div key={scenario.scenarioKey} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">{scenario.title}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Score:</span>
                      <span className="font-medium text-blue-600">
                        {scenarioPoints}/{totalScenarioPoints} ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            Remember to apply these safety principles in your daily work to ensure a safe environment for yourself and your colleagues.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={onBack}
              className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
            <button 
              onClick={() => window.print()}
              className="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Print Certificate
            </button>
          </div>
        </div>
      </div>
    );
  }
  
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
        
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">{currentScenario.title}</h2>
            <span className="ml-3 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              Day {currentScenario.day}
            </span>
            {isInReviewMode && (
              <span className="ml-3 px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                Review Mode
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-1">{currentScenario.description}</p>
        </div>
      </div>
      
      {/* Scenario Image */}
      {scenarioImage && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
          <img 
            src={scenarioImage.src} 
            alt={scenarioImage.alt} 
            className="w-full h-64 object-cover"
          />
          <div className="p-3 bg-blue-50 text-sm text-blue-800">
            <p>{scenarioImage.caption}</p>
          </div>
        </div>
      )}
      
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <BarChart2 className="text-blue-600 mr-2" size={18} />
            <span className="text-sm font-medium text-gray-700">Progress</span>
          </div>
          <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {currentScenario.steps.length}</span>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-blue-700">Step Progress</span>
            <span className="text-xs font-medium text-blue-700">{Math.round((currentStepIndex + 1) / currentScenario.steps.length * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStepIndex + 1) / currentScenario.steps.length) * 100}%` }}
              aria-label="Step progress"
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Award className="text-purple-600 mr-1" size={16} />
              <span className="text-xs text-purple-700">Points Earned</span>
            </div>
            <span className="text-xs font-medium text-purple-700">
              {currentPoints} / {totalPossiblePoints}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${totalPossiblePoints > 0 
                  ? Math.min((currentPoints / totalPossiblePoints) * 100, 100)
                  : 0}%` 
              }}
              aria-label="Points progress"
            ></div>
          </div>
        </div>
      </div>
      
      {/* In review mode, show all questions */}
      {isInReviewMode ? (
        <div className="space-y-8">
          {currentScenario.steps.map((step, stepIndex) => (
            <div key={step.id} className={`p-4 border rounded-lg ${stepIndex === currentStepIndex ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
              <SafetyStepQuestion 
                step={step}
                selectedOptionId={userChoices[step.id]}
                onSelectOption={handleSelectOption}
                showFeedback={true}
                isReviewMode={true}
              />
            </div>
          ))}
          
          <div className="flex justify-center mt-8">
            <button
              onClick={onBack}
              className="flex items-center py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <>
          <SafetyStepQuestion 
            step={currentStep}
            selectedOptionId={selectedOptionId}
            onSelectOption={handleSelectOption}
            showFeedback={showFeedback || isInReviewMode}
            isReviewMode={isInReviewMode}
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
                    {!allVitalStepsCorrect ? 'Complete Vital Steps' : !allStepsAnswered ? 'Answer All Questions' : 'Review Answers'}
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
          
          {isLastStep && !canComplete && !isInReviewMode && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle size={24} className="text-yellow-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Cannot Complete Scenario</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    {!allVitalStepsCorrect && (
                      <span className="block mb-1">
                        You must correctly answer all vital safety questions before completing this scenario.
                        Review your answers to the questions marked as "VITAL".
                      </span>
                    )}
                    {!allStepsAnswered && (
                      <span className="block">
                        Please answer all questions in this scenario.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ScenarioDetail;
