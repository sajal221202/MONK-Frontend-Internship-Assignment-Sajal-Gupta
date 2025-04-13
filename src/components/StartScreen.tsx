interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl subtle-shadow overflow-hidden animate-fade-in">
        <div className="gradient-bg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-1">Sentence Builder</h1>
          <p className="text-blue-100 text-sm">Complete the sentences by selecting the correct words</p>
          
          <div className="relative mt-4 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4 animate-slide-up">
            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="font-semibold text-blue-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                How to Play
              </h3>
              <ul className="text-sm text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full text-blue-600 text-xs font-medium mr-2 mt-0.5">1</span>
                  <span>Fill in the blanks with the correct words from the options provided</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full text-blue-600 text-xs font-medium mr-2 mt-0.5">2</span>
                  <span>You have 30 seconds to answer each question</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full text-blue-600 text-xs font-medium mr-2 mt-0.5">3</span>
                  <span>Click on a filled blank to remove your selection</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full text-blue-600 text-xs font-medium mr-2 mt-0.5">4</span>
                  <span>Complete all 10 questions to see your score</span>
                </li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={onStart}
            className="mt-6 w-full gradient-bg hover:opacity-95 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
          >
            <span>Start Quiz</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
