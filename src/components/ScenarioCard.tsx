import React from 'react';
import { Scenario } from '../types/campaign';
import { Calendar, CheckCircle, Lock } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  onSelect: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ 
  scenario, 
  isCompleted, 
  isLocked, 
  isCurrent,
  onSelect 
}) => {
  return (
    <div 
      className={`
        relative border rounded-lg p-5 transition-all duration-200
        ${isLocked ? 'bg-gray-100 border-gray-300 opacity-75' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}
        ${isCurrent ? 'ring-2 ring-blue-500 shadow-md' : ''}
        ${isCompleted ? 'border-green-200' : ''}
      `}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="text-green-500" size={20} />
        </div>
      )}
      
      {isLocked && (
        <div className="absolute top-3 right-3">
          <Lock className="text-gray-400" size={20} />
        </div>
      )}
      
      <div className="flex items-center mb-3">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <Calendar className="text-blue-600" size={18} />
        </div>
        <span className="text-sm font-medium text-blue-600">Day {scenario.day}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{scenario.title}</h3>
      
      <p className="text-gray-600 mb-4 text-sm">{scenario.description}</p>
      
      <button
        onClick={onSelect}
        disabled={isLocked}
        className={`
          w-full py-2 px-4 rounded text-sm font-medium transition-colors duration-200
          ${isCompleted 
            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
            : isLocked 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'}
        `}
        aria-label={`${isLocked ? 'Locked: ' : ''}${isCompleted ? 'Review ' : 'Start '} ${scenario.title}`}
      >
        {isCompleted ? 'Review' : isLocked ? 'Locked' : 'Start'}
      </button>
    </div>
  );
};

export default ScenarioCard;
