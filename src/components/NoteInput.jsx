import { Brain, Sparkles, FileText } from 'lucide-react';
import PropTypes from 'prop-types';

export default function NoteInput({ notes, setNotes, onGenerate, isLoading }) {
    const isInputEmpty = !notes.trim();

    return (
        <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
                    <Brain className="text-white w-10 h-10" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                    Study Buddy
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Transform your messy lecture notes into interactive quizzes and flashcards instantly with AI.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100"></div>

                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4 text-gray-700 font-medium">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span>Paste your notes</span>
                    </div>

                    <div className="relative">
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            disabled={isLoading}
                            aria-label="Lecture notes input"
                            className={`w-full h-80 p-6 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all text-gray-700 font-mono text-sm leading-relaxed placeholder:text-gray-400 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            placeholder={`Example usage:

Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.

Key components:
1. Chlorophyll: Green pigment that absorbs light
2. Stomata: Pores for gas exchange
3. Thylakoids: Site of light-dependent reactions

...paste your full lecture content here!`}
                        />
                    </div>

                    <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="text-xs text-gray-500">
                            {notes.length > 0 ? `${notes.length} characters` : 'Ready for input'}
                        </div>
                        <button
                            onClick={onGenerate}
                            disabled={isInputEmpty || isLoading}
                            className={`
                flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md
                ${isInputEmpty || isLoading
                                    ? 'bg-gray-300 cursor-not-allowed hidden-shadow'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                                }
              `}
                        >
                            <Sparkles className={`w-5 h-5 ${(!isInputEmpty && !isLoading) && 'animate-pulse'} ${isLoading && 'animate-spin'}`} />
                            {isLoading ? 'Generating...' : 'Generate Study Materials'}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

NoteInput.propTypes = {
    notes: PropTypes.string.isRequired,
    setNotes: PropTypes.func.isRequired,
    onGenerate: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};
