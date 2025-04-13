interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Sentence Builder</h1>
          <p className="text-blue-100 mt-2">Complete the sentences by selecting the correct words</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">How to Play:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fill in the blanks with the correct words from the options provided</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You have 30 seconds to answer each question</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Click on a filled blank to remove your selection</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Complete all 10 questions to see your score</span>
                </li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={onStart}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
} 