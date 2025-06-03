import React, { useMemo } from 'react';
import { SafetyStep, SafetyStepOption } from '../types/campaign';
import { CheckCircle, XCircle, Star } from 'lucide-react';

interface SafetyStepQuestionProps {
  step: SafetyStep;
  selectedOptionId: string | undefined;
  onSelectOption: (stepId: string, optionId: string) => void;
  showFeedback: boolean;
  isReviewMode?: boolean;
}

// Fisher-Yates shuffle algorithm for randomizing array elements
const shuffleArray = <T,>(array: T[], seed: string): T[] => {
  const shuffled = [...array];
  
  // Simple seeded random function
  const seededRandom = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) / 2147483647;
  };
  
  // Use the seed to ensure consistent shuffling
  for (let i = shuffled.length - 1; i > 0; i--) {
    const seedValue = seed + i.toString();
    const j = Math.floor(seededRandom(seedValue) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

const SafetyStepQuestion: React.FC<SafetyStepQuestionProps> = ({
  step,
  selectedOptionId,
  onSelectOption,
  showFeedback,
  isReviewMode = false
}) => {
  // Randomize options order using useMemo to maintain the same order during re-renders
  // but shuffle when the step changes
  const shuffledOptions = useMemo(() => {
    return shuffleArray(step.options, step.id);
  }, [step.id]); // Only re-shuffle when step.id changes

  return (
    <div className="mb-8">
      <div className="flex items-start mb-4">
        {step.vital && (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded">
            VITAL
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-800">{step.description}</h3>
        <span className="ml-auto flex items-center text-purple-700 font-medium bg-purple-50 px-2 py-1 rounded">
          <Star size={16} className="mr-1 text-purple-500" />
          Worth points
        </span>
      </div>

      <div className="space-y-3">
        {shuffledOptions.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const showCorrectness = showFeedback && isSelected;
          
          // Determine styling based on selection state and review mode
          let optionClass = "p-4 border rounded-lg transition-all cursor-pointer ";
          
          if (isReviewMode) {
            // In review mode, show correct/incorrect for the selected option
            if (isSelected) {
              optionClass += option.correct 
                ? "border-green-500 bg-green-50" 
                : "border-red-500 bg-red-50";
            } else {
              optionClass += "border-gray-200";
            }
          } else {
            // In normal mode
            if (isSelected) {
              if (showFeedback) {
                optionClass += option.correct 
                  ? "border-green-500 bg-green-50" 
                  : "border-red-500 bg-red-50";
              } else {
                optionClass += "border-blue-500 bg-blue-50";
              }
            } else {
              optionClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
            }
          }
          
          return (
            <div 
              key={option.id}
              className={optionClass}
              onClick={() => !isReviewMode && onSelectOption(step.id, option.id)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className={`font-medium ${
                      isSelected 
                        ? showFeedback || isReviewMode
                          ? option.correct 
                            ? "text-green-700" 
                            : "text-red-700"
                          : "text-blue-700"
                        : "text-gray-700"
                    }`}>
                      {option.text}
                    </p>
                  </div>
                  
                  {(showCorrectness || (isReviewMode && isSelected)) && (
                    <div className="mt-2 text-sm">
                      <div className={`flex items-start ${option.correct ? "text-green-700" : "text-red-700"}`}>
                        {option.correct ? (
                          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        )}
                        <p>{option.feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-3 flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? isReviewMode
                        ? option.correct
                          ? "border-green-600 bg-green-600"
                          : "border-red-600 bg-red-600"
                        : "border-blue-600 bg-blue-600" 
                      : "border-gray-300"
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SafetyStepQuestion;
