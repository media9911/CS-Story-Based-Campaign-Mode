import React, { useMemo } from 'react';
import { SafetyStep, SafetyStepOption } from '../types/campaign';
import { CheckCircle, XCircle, Star } from 'lucide-react';

interface SafetyStepQuestionProps {
  step: SafetyStep;
  selectedOptionId: string | undefined;
  onSelectOption: (stepId: string, optionId: string) => void;
  showFeedback: boolean;
}

// Fisher-Yates shuffle algorithm for randomizing array elements
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SafetyStepQuestion: React.FC<SafetyStepQuestionProps> = ({
  step,
  selectedOptionId,
  onSelectOption,
  showFeedback
}) => {
  // Randomize options order using useMemo to maintain the same order during re-renders
  // but shuffle when the step changes
  const shuffledOptions = useMemo(() => {
    return shuffleArray(step.options);
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
          
          return (
            <div 
              key={option.id}
              className={`p-4 border rounded-lg transition-all cursor-pointer ${
                isSelected 
                  ? showFeedback
                    ? option.correct 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
              onClick={() => onSelectOption(step.id, option.id)}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className={`font-medium ${
                      isSelected 
                        ? showFeedback
                          ? option.correct 
                            ? 'text-green-700' 
                            : 'text-red-700'
                          : 'text-blue-700'
                        : 'text-gray-700'
                    }`}>
                      {option.text}
                    </p>
                  </div>
                  
                  {showCorrectness && (
                    <div className="mt-2 text-sm">
                      <div className={`flex items-start ${option.correct ? 'text-green-700' : 'text-red-700'}`}>
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
                      ? 'border-blue-600 bg-blue-600' 
                      : 'border-gray-300'
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
