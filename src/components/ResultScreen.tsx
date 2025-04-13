import { useEffect, useState } from 'react';
import { Result } from '../types';

interface ResultScreenProps {
  results: Result[];
  onRetry: () => void;
}

export default function ResultScreen({ results, onRetry }: ResultScreenProps) {
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const totalQuestions = results.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const [animateScore, setAnimateScore] = useState(false);
  
  useEffect(() => {
    // Start the animation after a short delay
    const timeout = setTimeout(() => {
      setAnimateScore(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  const renderQuestionWithAnswers = (result: Result) => {
    const parts = result.question.split(/_{3,}/g);
    
    return (
      <div className="text-lg">
        {parts.map((part, index) => (
          <span key={`part-${index}`}>
            {part}
            {index < parts.length - 1 && (
              <span
                className={`px-3 py-1 mx-1 rounded inline-block ${
                  result.userAnswers[index] === result.correctAnswers[index]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                } subtle-shadow`}
              >
                {result.userAnswers[index] || '[no answer]'}
                {result.userAnswers[index] !== result.correctAnswers[index] && (
                  <span className="block text-xs text-gray-600 mt-1 font-medium">
                    Correct: <span className="text-green-600">{result.correctAnswers[index]}</span>
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-emerald-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreMessage = () => {
    if (score >= 80) return 'Excellent!';
    if (score >= 60) return 'Good job!';
    if (score >= 40) return 'Not bad!';
    return 'Keep practicing!';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl subtle-shadow overflow-hidden mb-8 animate-fade-in">
        <div className="gradient-bg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-1">Quiz Results</h1>
          <p className="text-blue-100 text-sm">Here's how you performed</p>
          
          <div className="mt-8 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm p-1.5 relative">
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                <div className={`text-5xl font-bold transition-all duration-1000 ease-out ${getScoreColor()} ${animateScore ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  {score}%
                </div>
                <div className={`text-sm text-gray-600 mt-1 transition-all duration-1000 delay-300 ease-out ${animateScore ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  {correctAnswers}/{totalQuestions} correct
                </div>
                <div className={`absolute -bottom-2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full transition-all duration-1000 delay-500 ease-out ${animateScore ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  {getScoreMessage()}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Your Answers
            </h2>
            <div className="space-y-6">
              {results.map((result, index) => (
                <div 
                  key={result.questionId} 
                  className={`p-5 rounded-lg ${
                    result.isCorrect ? 'bg-green-50' : 'bg-red-50'
                  } subtle-shadow transition-all hover:shadow-md animate-slide-up`} 
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800 flex items-center">
                      <span className="w-7 h-7 rounded-full bg-white inline-flex items-center justify-center mr-2 text-sm font-semibold text-blue-700 subtle-shadow">
                        {index + 1}
                      </span>
                      Question {index + 1}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.isCorrect ? (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          Correct
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                          Incorrect
                        </span>
                      )}
                    </span>
                  </div>
                  {renderQuestionWithAnswers(result)}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={onRetry}
            className="w-full gradient-bg hover:opacity-95 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center animate-slide-up"
            style={{ animationDelay: '800ms' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
} 
