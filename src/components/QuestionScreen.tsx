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
  
  // Get the number of blanks in the question
  const blankCount = (question.question.match(/_{3,}/g) || []).length;

  // Reset state when question changes
  useEffect(() => {
    setSelectedWords([]);
    setRemainingOptions([...question.options]);
    setTimer(30);
    setIsTimeOut(false);
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
      <div className="text-xl leading-relaxed">
        {parts.map((part, index) => (
          <span key={`part-${index}`}>
            {part}
            {index < parts.length - 1 && (
              <span
                onClick={() => handleRemoveWord(index)}
                className={`px-2 py-1 mx-1 border-b-2 border-dashed ${
                  selectedWords[index]
                    ? 'bg-blue-100 border-blue-400 cursor-pointer'
                    : 'border-gray-400 cursor-default'
                } rounded inline-block min-w-[80px] text-center`}
              >
                {selectedWords[index] || ''}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-4 flex justify-between items-center">
          <div className="text-white font-medium">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className={`text-white px-4 py-1 rounded-full ${
            timer <= 10 ? 'bg-red-500' : 'bg-blue-700'
          }`}>
            <span className="font-mono">{formatTime(timer)}</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            {renderQuestion()}
          </div>
          
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">Select words:</h3>
            <div className="flex flex-wrap gap-3">
              {remainingOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectWord(option)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={submitAnswer}
            disabled={selectedWords.length < blankCount}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
              selectedWords.length === blankCount
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 