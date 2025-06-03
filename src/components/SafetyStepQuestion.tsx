import React from 'react';
import { SafetyStep, SafetyStepOption } from '../types/campaign';
import { CheckCircle, XCircle } from 'lucide-react';

interface SafetyStepQuestionProps {
  step: SafetyStep;
  selectedOptionId: string | undefined;
  onSelectOption: (stepId: string, optionId: string) => void;
  showFeedback: boolean;
}

const SafetyStepQuestion: React.FC<SafetyStepQuestionProps> = ({
  step,
  selectedOptionId,
  onSelectOption,
  showFeedback
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start mb-4">
        {step.vital && (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded">
            VITAL
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-800">{step.description}</h3>
      </div>

      <div className="space-y-3">
        {step.options.map((option) => {
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
