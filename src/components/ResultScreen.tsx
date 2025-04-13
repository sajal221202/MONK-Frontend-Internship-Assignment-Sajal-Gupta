import { Result } from '../types';

interface ResultScreenProps {
  results: Result[];
  onRetry: () => void;
}

export default function ResultScreen({ results, onRetry }: ResultScreenProps) {
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const totalQuestions = results.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  const renderQuestionWithAnswers = (result: Result) => {
    const parts = result.question.split(/_{3,}/g);
    
    return (
      <div className="text-lg">
        {parts.map((part, index) => (
          <span key={`part-${index}`}>
            {part}
            {index < parts.length - 1 && (
              <span
                className={`px-2 py-1 mx-1 rounded inline-block ${
                  result.userAnswers[index] === result.correctAnswers[index]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {result.userAnswers[index] || '[no answer]'}
                {result.userAnswers[index] !== result.correctAnswers[index] && (
                  <span className="block text-xs text-gray-500 mt-1">
                    Correct: {result.correctAnswers[index]}
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
          <div className="mt-4 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${
                  score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {score}%
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {correctAnswers}/{totalQuestions}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Answers</h2>
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={result.questionId} className={`p-4 rounded-lg ${
                  result.isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">
                      Question {index + 1}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  {renderQuestionWithAnswers(result)}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 