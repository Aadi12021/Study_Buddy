import { useState } from 'react'
import NoteInput from './components/NoteInput'
import Menu from './components/Menu'
import Quiz from './components/Quiz'
import Flashcards from './components/Flashcards'
import Login from './components/Login'
import { BookOpen } from 'lucide-react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mode, setMode] = useState('input') // input, menu, quiz, flashcards
  const [notes, setNotes] = useState('')

  const [questions, setQuestions] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const generateStudyMaterials = async () => {
    if (!notes.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI assistant that generates study materials from lecture notes. Output ONLY valid JSON with no markdown formatting or explanations."
            },
            {
              role: "user",
              content: `Based on the following lecture notes, generate 5 multiple-choice questions (with 4 options and the index of the correct answer) and 8 flashcards (front/back).

              Return the response in this exact JSON format:
              {
                "questions": [
                  {
                    "question": "Question text here",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correct": 0
                  }
                ],
                "flashcards": [
                  {
                    "front": "Concept or term",
                    "back": "Definition or explanation"
                  }
                ]
              }

              Lecture Notes:
              ${notes}`
            }
          ],
          temperature: 0.2, // Low temperature for more deterministic/structured output
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Clean up markdown if present (e.g. ```json ... ```)
      const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

      const parsedData = JSON.parse(cleanedContent);

      if (parsedData.questions && parsedData.flashcards) {
        setQuestions(parsedData.questions);
        setFlashcards(parsedData.flashcards);
        setMode('menu');
      } else {
        throw new Error("Invalid JSON structure received");
      }

    } catch (error) {
      console.error("Error generating study materials:", error);
      setError("Failed to generate study materials. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 to-white font-sans text-gray-900">

      {/* Show Header only when NOT in input mode (since NoteInput has its own hero header) */}
      {mode !== 'input' && (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => mode !== 'menu' && setMode('menu')}
            >
              <BookOpen className="text-blue-600 w-6 h-6" />
              Study Buddy
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setNotes('');
                  setQuestions([]);
                  setFlashcards([]);
                  setMode('input');
                  setError(null);
                }}
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition hover:bg-blue-50 px-4 py-2 rounded-lg"
              >
                New Notes
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">

        {error && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 font-bold px-2">✕</button>
          </div>
        )}

        {/* Dynamic component rendering with key-based animation */}
        <div key={mode} className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-forwards">
          {mode === 'input' && (
            <NoteInput
              notes={notes}
              setNotes={setNotes}
              onGenerate={generateStudyMaterials}
              isLoading={loading}
            />
          )}
          {mode === 'menu' && (
            <Menu
              onSelectMode={(newMode) => {
                if (newMode === 'input') {
                  setNotes('');
                  setQuestions([]);
                  setFlashcards([]);
                  setError(null);
                }
                setMode(newMode);
              }}
              questions={questions}
              flashcards={flashcards}
            />
          )}
          {mode === 'quiz' && (
            <Quiz
              questions={questions}
              onExit={() => setMode('menu')}
            />
          )}
          {mode === 'flashcards' && (
            <Flashcards
              flashcards={flashcards}
              onExit={() => setMode('menu')}
            />
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>Built with ❤️ using React & Llama 3</p>
      </footer>
    </div>
  )
}

export default App
