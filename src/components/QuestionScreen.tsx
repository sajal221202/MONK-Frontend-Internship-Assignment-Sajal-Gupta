import { useEffect, useState } from 'react';
import { Question, Result } from '../types';
import { formatTime } from '../lib/utils';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: (result: Result) => void;
}

export default function QuestionScreen({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onNext 
}: QuestionScreenProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingOptions, setRemainingOptions] = useState<string[]>(question.options);
  const [timer, setTimer] = useState<number>(30);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  
  // Get the number of blanks in the question
  const blankCount = (question.question.match(/_{3,}/g) || []).length;

  // Reset state when question changes
  useEffect(() => {
    setSelectedWords([]);
    setRemainingOptions([...question.options]);
    setTimer(30);
    setIsTimeOut(false);
    setIsAnimating(true);
    
    // Reset animation after a short delay
    const animTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    return () => clearTimeout(animTimeout);
  }, [question]);

  // Timer effect
  useEffect(() => {
    if (timer > 0 && !isTimeOut) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0 && !isTimeOut) {
      setIsTimeOut(true);
      submitAnswer();
    }
  }, [timer, isTimeOut]);

  const handleSelectWord = (word: string) => {
    // Only allow selection if there are still blanks to fill
    if (selectedWords.length < blankCount) {
      setSelectedWords([...selectedWords, word]);
      
      // Remove from available options
      setRemainingOptions(
        remainingOptions.filter(option => option !== word)
      );
    }
  };

  const handleRemoveWord = (index: number) => {
    if (index >= 0 && index < selectedWords.length) {
      // Get the word being removed
      const removedWord = selectedWords[index];
      
      // Add back to available options
      setRemainingOptions([...remainingOptions, removedWord]);
      
      // Remove from selected words
      const newSelectedWords = [...selectedWords];
      newSelectedWords.splice(index, 1);
      setSelectedWords(newSelectedWords);
    }
  };

  const submitAnswer = () => {
    // Prepare the result
    const result: Result = {
      questionId: question.questionId,
      question: question.question,
      isCorrect: arraysEqual(selectedWords, question.correctAnswer),
      userAnswers: selectedWords,
      correctAnswers: question.correctAnswer,
    };
    
    onNext(result);
  };

  // Helper function to check if two arrays have the same elements in the same order
  const arraysEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // Parse question to display words and blanks
  const renderQuestion = () => {
    const parts = question.question.split(/_{3,}/g);
    
    return (
      <div className="text-xl leading-relaxed font-medium">
        {parts.map((part, index) => (
          <span key={`part-${index}`}>
            {part}
            {index < parts.length - 1 && (
              <span
                onClick={() => handleRemoveWord(index)}
                className={`px-3 py-1 mx-1 question-blank rounded inline-block min-w-[100px] text-center ${
                  selectedWords[index]
                    ? 'bg-blue-50 text-blue-800 cursor-pointer'
                    : 'bg-gray-50 cursor-default'
                } ${selectedWords[index] ? 'subtle-shadow' : ''}`}
              >
                {selectedWords[index] || ''}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className={`max-w-3xl w-full bg-white rounded-xl subtle-shadow overflow-hidden ${isAnimating ? 'animate-fade-in' : ''}`}>
        <div className="gradient-bg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              Question {questionNumber} of {totalQuestions}
            </div>
            <div className={`px-4 py-1 rounded-full ${
              timer <= 10 ? 'bg-red-500' : 'bg-white/25 backdrop-blur-sm'
            } ${timer <= 10 ? 'animate-pulse' : ''}`}>
              <span className="font-mono text-white font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {formatTime(timer)}
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-blue-200/50 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className={`mb-8 ${isAnimating ? 'animate-slide-up' : ''}`}>
            {renderQuestion()}
          </div>
          
          <div className={`mb-8 ${isAnimating ? 'animate-slide-up' : ''}`} style={{ animationDelay: '200ms' }}>
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Select words:
            </h3>
            <div className="flex flex-wrap gap-3">
              {remainingOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectWord(option)}
                  className="option-button px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={submitAnswer}
            disabled={selectedWords.length < blankCount}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              selectedWords.length === blankCount
                ? 'gradient-bg hover:opacity-95 transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-400 cursor-not-allowed'
            } flex items-center justify-center`}
          >
            <span>Next Question</span>
            {selectedWords.length === blankCount && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 
