import { useEffect, useState } from 'react'
import { Question, Result, ApiResponse } from './types'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import StartScreen from './components/StartScreen'
import { questionsData } from './data/questions'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1)
  const [results, setResults] = useState<Result[]>([])
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Determine if we're in development or production
        const isProduction = import.meta.env.PROD;
        
        if (isProduction) {
          // Use local data in production
          setQuestions(questionsData.data.questions);
          setLoading(false);
        } else {
          // In development, try to use JSON Server
          try {
            const response = await fetch('http://localhost:3001/data');
            if (!response.ok) {
              throw new Error('Failed to fetch questions');
            }
            const data = await response.json();
            
            if (data && data.questions) {
              setQuestions(data.questions);
            } else {
              // Fallback to local data if JSON server data structure is different
              setQuestions(questionsData.data.questions);
            }
          } catch (err) {
            // Fallback to local data if JSON server is not available
            console.warn('JSON Server not available, using local data');
            setQuestions(questionsData.data.questions);
          }
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const startQuiz = () => {
    setIsStarted(true)
    setCurrentQuestionIndex(0)
  }

  const handleNextQuestion = (result: Result) => {
    setResults((prev) => [...prev, result])
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const retryQuiz = () => {
    setResults([])
    setCurrentQuestionIndex(0)
    setIsCompleted(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <p className="mt-4 text-sm text-gray-500">
            Please refresh the page or try again later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isStarted ? (
        <StartScreen onStart={startQuiz} />
      ) : isCompleted ? (
        <ResultScreen results={results} onRetry={retryQuiz} />
      ) : (
        <QuestionScreen 
          question={questions[currentQuestionIndex]} 
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onNext={handleNextQuestion} 
        />
      )}
    </div>
  )
}

export default App
